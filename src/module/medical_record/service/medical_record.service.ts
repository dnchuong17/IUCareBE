import {BadRequestException, Injectable} from "@nestjs/common";
import {MedicalRecordDto} from "../dto/medical_record.dto";
import { DataSource } from 'typeorm';
import {AppointmentService} from "../../appointment/service/appointment.service";
import {RedisHelper} from "../../redis/redis.service";
import {AppointmentConstant} from "../../appointment/utils/appointment.constant";

@Injectable()
export class MedicalRecordService {
    constructor(private readonly dataSource: DataSource,
                private readonly redisHelper : RedisHelper) {
    }

    async firstRecord(recordDto: MedicalRecordDto) {
        const query = `INSERT INTO records (treatment, diagnosis, suggest, date, "appointmentId")
                       VALUES ($1, $2, $3, $4, $5);`
        return await this.dataSource.query(query,
            [
                null,
                null,
                null,
                recordDto.date,
                recordDto.appointmentId
            ]
        );
    }

    async createMedicalRecord(medicalRecordDto: MedicalRecordDto, id: number) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const appointmentQuery = `SELECT appointment_time, appointment_status FROM appointment WHERE appointment_id = $1`;
            const appointment = await queryRunner.query(appointmentQuery, [medicalRecordDto.appointmentId]);

            const currentTime = new Date();
            const appointmentTime = appointment[0].appointment_time;
            const appointmentStatus = appointment[0].appointment_status;

            if(appointmentStatus === AppointmentConstant.DONE){
                return { message: "Medical examination completed." };
            }

            if (appointmentTime.getDate() > currentTime.getDate()) {
                return { message: "The appointment is not due date! Cannot examine." };
            }

            if (appointmentTime.getDate() === currentTime.getDate() && appointmentTime.getHours() > currentTime.getHours()) {
                return { message: "The appointment is not due yet for today! Cannot examine." };
            }

            const updateRecordQuery = `
            UPDATE records
            SET treatment = $1,
                diagnosis = $2,
                suggest   = $3
            WHERE medical_record_id = $4
        `;
            await queryRunner.query(updateRecordQuery, [
                medicalRecordDto.treatment,
                medicalRecordDto.diagnosis,
                medicalRecordDto.suggest,
                id,
            ]);

            if (medicalRecordDto.medicines?.length) {
                const values = medicalRecordDto.medicines
                    .map((medicineId) => `(${id}, ${medicineId})`)
                    .join(",");

                const insertMedicinesQuery = `
                INSERT INTO medicine_record (medical_record_id, medicine_id)
                VALUES ${values} ON CONFLICT DO NOTHING;
            `;
                await queryRunner.query(insertMedicinesQuery);
            }

            await queryRunner.commitTransaction();

            return { message: `Medical record ${id} updated successfully.` };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error("Error updating medical record:", error.message);
            return { message: "Failed to update the medical record." }; // Gracefully handle the error
        } finally {
            await queryRunner.release();
        }
    }



    async getRecordByAppointmentId(id: number) {
        const cacheKey = `appointmentId:${id}`;
        const cachedRecord = await this.redisHelper.get(cacheKey);
        const query = `
        SELECT 
            r.medical_record_id,
            r.treatment,
            r.diagnosis,
            r.date,
            r.suggest,
            m.name_medicine,
            a.appointment_id,
            a.appointment_time,
            a.appointment_status,
            a."doctorId",
            a."patientId",
            p.student_id
        FROM records r
        LEFT JOIN appointment a ON r."appointmentId" = a.appointment_id
        LEFT JOIN patient p ON a."patientId" = p.patient_id
        LEFT JOIN medicine_record mr ON r.medical_record_id = mr.medical_record_id
        LEFT JOIN medicine m ON m.medicine_id = mr.medicine_id
        WHERE a.appointment_id = $1
    `;

        const result = await this.dataSource.query(query, [id]);

        if (result.length > 0) {
            const { name_medicine, ...otherFields } = result[0];

            await  this.redisHelper.set(cacheKey, {name_medicine, ...otherFields});

            const medicines = result.map((row: { name_medicine: string }) => row.name_medicine);

            return {
                ...otherFields,
                medicines
            };
        }

        return null;
    }


    async getAllRecords(patientId: number) {
        const query = `
            SELECT d.doctor_name,
                   r.treatment,
                   r.diagnosis,
                   r.date,
                   a.appointment_id
            FROM records r
                     LEFT JOIN appointment a ON r."appointmentId" = a.appointment_id
                     LEFT JOIN doctor d ON a."doctorId" = d.doctor_id
                     LEFT JOIN patient p ON a."patientId" = p.patient_id
            WHERE p.patient_id = $1
        `;
        const result = await this.dataSource.query(query, [patientId]);
        return result.length > 0 ? result : null;
    }


    async recordDetails(appointmentId: number) {
        const query = `
            SELECT p.patient_name,
                   d.doctor_name,
                   r.treatment,
                   r.diagnosis,
                   r.suggest,
                   p.patient_phone,
                   p.student_id,
                   p.patient_address,
                   p.allergy,
                   i.insurance_name,
                   i.insurance_number,
                   i.registered_hospital,
                   m.name_medicine
            FROM records r
                     LEFT JOIN appointment a ON r."appointmentId" = a.appointment_id
                     LEFT JOIN patient p ON a."patientId" = p.patient_id
                     LEFT JOIN doctor d ON a."doctorId" = d.doctor_id
                     LEFT JOIN insurance i ON i."patientId" = p.patient_id
                     LEFT JOIN medicine_record mr ON r.medical_record_id = mr.medical_record_id
                     LEFT JOIN medicine m ON mr.medicine_id = m.medicine_id
            WHERE a.appointment_id = $1
        `;
        const result = await this.dataSource.query(query, [appointmentId]);

        if (result.length > 0) {
            const record = { ...result[0] };
            record.name_medicine = result.map((row: {
                name_medicine: string
            }) => row.name_medicine).filter((value, index, self) => self.indexOf(value) === index);

            return record;
        }

        return null;
    }


    async getPreviousRecord(patientId: number, date: Date) {
        const query = `
            SELECT r.medical_record_id,
                   r.treatment,
                   r.diagnosis,
                   r.suggest,
                   r.date,
                   a.appointment_id,
                   a.appointment_time,
                   a.appointment_status,
                   a."doctorId",
                   a."patientId",
                   p.allergy,
                   m.name_medicine
            FROM records r
                     LEFT JOIN appointment a ON r."appointmentId" = a.appointment_id
                     LEFT JOIN patient p ON a."patientId" = p.patient_id
                     LEFT JOIN medicine_record mr ON r.medical_record_id = mr.medical_record_id
                     LEFT JOIN medicine m ON mr.medicine_id = m.medicine_id
            WHERE r.date < $1
              AND a."patientId" = $2
            ORDER BY r.date DESC
        `;

        const result = await this.dataSource.query(query, [date, patientId]);

        if (result.length > 0) {
            const record = { ...result[0] };
            record.name_medicine = result.map(row => row.name_medicine).filter((value, index, self) => self.indexOf(value) === index);

            return record;
        }
        return null;
    }
}