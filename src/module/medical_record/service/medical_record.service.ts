import {Injectable} from "@nestjs/common";
import {MedicalRecordDto} from "../dto/medical_record.dto";
import { DataSource } from 'typeorm';
import {AppointmentService} from "../../appointment/service/appointment.service";

@Injectable()
export class MedicalRecordService {
    constructor(private readonly dataSource: DataSource) {}

    async firstRecord(recordDto : MedicalRecordDto){
        const query = `INSERT INTO medical_record ("patientId", "doctorId", treatment, diagnosis, suggest, date, "appointmentId")
            VALUES ($1, $2, $3, $4, $5, $6, $7);`
        return await this.dataSource.query(query,
            [
                recordDto.patientId,
                recordDto.doctorId,
                null,
                null,
                null,
                recordDto.date,
                recordDto.appointmentId
            ]
        );
    }


    async createMedicalRecord(medicalRecordDto: MedicalRecordDto, id: number) {
        const query = `UPDATE medical_record
                       SET "treatment" = $1,
                           "diagnosis"  = $2,
                           "suggest" = $3,
                       WHERE medical_record_id = $4;`;

        return await this.dataSource.query(query, [
            medicalRecordDto.treatment,
            medicalRecordDto.diagnosis,
            medicalRecordDto.suggest,
            id
        ]);
    }

    async getRecordByAppointmentId(id: number) {
        const query = 'SELECT record.* FROM medical_record AS record LEFT JOIN appointment AS apm ON record."appointmentId" = apm.appointment_id WHERE apm.appointment_id = $1';
        const result = await this.dataSource.query(query, [id]);
        return result[0];
    }

    async getAllRecords(patientId: number) {
        const query = `SELECT * FROM medical_record LEFT JOIN patient ON medical_record."patientId" = patient.patient_id WHERE patient.patient_id = $1`;
        return await this.dataSource.query(query, [patientId]);
    }

    async getPreviousRecord(patientId: number,date: Date){
        const query = `
      SELECT * 
      FROM medical_record 
      WHERE date < $1 AND "patientId" = $2
      ORDER BY date DESC 
    `;
        const result = await this.dataSource.query(query, [date, patientId]);
        return result.length ? result[0] : null;
    }
}