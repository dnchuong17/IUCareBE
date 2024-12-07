import {Injectable} from "@nestjs/common";
import {MedicalRecordDto} from "../dto/medical_record.dto";
import { DataSource } from 'typeorm';
import {AppointmentService} from "../../appointment/service/appointment.service";

@Injectable()
export class MedicalRecordService {
    constructor(private readonly dataSource: DataSource) {}

    async firstRecord(recordDto : MedicalRecordDto){
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
        // Update basic medical record details
        const updateRecordQuery = `
        UPDATE records
        SET 
            "treatment" = $1,
            "diagnosis" = $2,
            "suggest"   = $3
        WHERE medical_record_id = $4;
    `;
        await this.dataSource.query(updateRecordQuery, [
            medicalRecordDto.treatment,
            medicalRecordDto.diagnosis,
            medicalRecordDto.suggest,
            id,
        ]);

        const insertMedicinesQuery = `
        INSERT INTO medicine_record (medical_record_id, medicine_id)
        VALUES ($1, $2);
    `;

        for (const medicineId of medicalRecordDto.medicines) {
            await this.dataSource.query(insertMedicinesQuery, [id, medicineId]);
        }

        return {
            message: `Medical record with ID ${id} updated successfully.`,
        };
    }


    async getRecordByAppointmentId(id: number) {
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
            a."patientId"
        FROM records r 
        LEFT JOIN appointment a ON r."appointmentId" = a.appointment_id
        LEFT JOIN medicine_record mr ON r.medical_record_id = mr.medical_record_id
        LEFT JOIN medicine m ON m.medicine_id = mr.medicine_id
        WHERE a.appointment_id = $1
    `;
        const result = await this.dataSource.query(query, [id]);
        return result.length > 0 ? result[0] : null;
    }


    async getAllRecords(patientId: number) {
        const query = `
        SELECT 
            d.doctor_name,
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
        SELECT 
            p.patient_name,
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
     const result = await this.dataSource.query(query, [appointmentId])
        return result.length > 0 ? result[0] : null;
    }


    async getPreviousRecord(patientId: number,date: Date){
        const query = `
      SELECT * 
      FROM records LEFT JOIN appointment ON records."appointmentId" = appointment.appointment_id
      WHERE date < $1 AND "patientId" = $2
      ORDER BY date DESC 
          SELECT 
          r.medical_record_id,
          r.treatment,
          r.diagnosis,
          r.suggest,
          r.date,
          a.appointment_id,
          a.appointment_time,
          a.appointment_status,
          a."doctorId",
          a."patientId",
          p.patient_name,
          p.student_id,
          p.patient_address,
          p.patient_phone,
          p.patient_major,
          p.allergy
          FROM records  r
          LEFT JOIN appointment a ON r."appointmentId" = a.appointment_id
          LEFT JOIN patient p ON a."patientId" = p.patient_id 
          WHERE date < $1 AND "patientId" = $2
          ORDER BY date DESC 
    `;
        const result = await this.dataSource.query(query, [date, patientId]);
        return result.length ? result[0] : null;
    }
}