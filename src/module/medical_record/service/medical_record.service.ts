import {Injectable} from "@nestjs/common";
import {MedicalRecordDto} from "../dto/medical_record.dto";
import { DataSource } from 'typeorm';
import {AppointmentService} from "../../appointment/service/appointment.service";

@Injectable()
export class MedicalRecordService {
    constructor(private readonly dataSource: DataSource) {}

    async firstRecord(recordDto : MedicalRecordDto){
        const query = `INSERT INTO medical_record ("patientId", "doctorId", treatment, diagnosis, date)
            VALUES ($1, $2, $3, $4, $5);`
        return await this.dataSource.query(query,
            [
                recordDto.patientId,
                recordDto.doctorId,
                null,
                null,
                recordDto.date,
            ]
        );
    }


    async createMedicalRecord( medicalRecordDto: MedicalRecordDto, id: number) {
        const query = `UPDATE medical_record
                       SET "treatment" = $1,
                           "diagnosis"  = $2
                       WHERE medical_record_id = $3;`;

        return await this.dataSource.query(query, [
            medicalRecordDto.treatment,
            medicalRecordDto.diagnosis,
            id
        ]);
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