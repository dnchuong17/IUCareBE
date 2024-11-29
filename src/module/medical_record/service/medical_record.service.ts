import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Medical_recordEntity} from "../entity/medical_record.entity";
import {Repository} from "typeorm";
import {MedicalRecordDto} from "../dto/medical_record.dto";
import { DataSource } from 'typeorm';

@Injectable()
export class MedicalRecordService {
    constructor(private readonly dataSource: DataSource) {}

    async createMedicalRecord(medicalRecordDto: MedicalRecordDto){
        return await this.dataSource.query(
            `INSERT INTO medical_record (patient_id, doctor_id, treatment, diagnosis, date)
            VALUES ($1, $2, $3, $4, $5);`,
            [
                medicalRecordDto.patientId,
                medicalRecordDto.doctorId,
                medicalRecordDto.treatment,
                medicalRecordDto.diagnosis,
                medicalRecordDto.date
            ]
        );
    }
}