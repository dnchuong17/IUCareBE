import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PatientEntity } from "../entity/patient.entity";
import { DataSource, Repository } from "typeorm";
import { PatientDto } from "../dto/patient.dto";

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(PatientEntity)
        private readonly patientRepository: Repository<PatientEntity>,
        private readonly dataSource: DataSource,
    ) {}

    async getInformationPatients(studentIds: string[]) {
        if (studentIds.length === 0) return [];

        const placeholders = studentIds.map((_, i) => `$${i + 1}`).join(', ');
        const query = `
            SELECT
                p.*,
                r.*
            FROM patient p
                     JOIN appointment a ON a.patient_id = p.patient_id
                     JOIN records r ON r."appointmentId" = a.appointment_id
            WHERE p.student_id IN (${placeholders})
            ORDER BY r.date DESC
        `;

        const result = await this.dataSource.query(query, studentIds);
        return result;
    }

    async getAllStudentIds(): Promise<string[]> {
        const result = await this.dataSource.query(`SELECT student_id FROM patient`);
        return result.map((row) => {
            return {
                studentId : row.student_id
            }
        });
    }

    async findStudentBySID(studentId: string) {
        const query = `
            SELECT *
            FROM patient
            WHERE student_id = $1
        `;
        const result = await this.dataSource.query(query, [studentId]);
        return result;
    }

    async createPatient(patientDto: PatientDto) {
        const patientExisted = await this.findStudentBySID(patientDto.studentId);
        if (patientExisted.length > 0) {
            throw new BadRequestException('Patient already exists');
        }

        const insertPatientQuery = `
            INSERT INTO patient (
                patient_name,
                patient_address,
                patient_major,
                patient_phone,
                student_id,
                allergy
            )
            VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING patient_id
        `;

        const result = await this.dataSource.query(insertPatientQuery, [
            patientDto.name,
            patientDto.address,
            patientDto.major,
            patientDto.phone,
            patientDto.studentId,
            patientDto.allergy,
        ]);

        return {
            message: "Patient registered successfully",
            patientId: result[0].patient_id,
        };
    }

    async searchPatient(studentId: string) {
        const query = `
            SELECT *
            FROM patient
            WHERE student_id ILIKE $1
        `;
        const result = await this.dataSource.query(query, [`%${studentId}%`]);

        return result.map(patient => ({
            patientId: patient.patient_id,
            studentId: patient.student_id,
            patientName: patient.patient_name,
        }));
    }
}
