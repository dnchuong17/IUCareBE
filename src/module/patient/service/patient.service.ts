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

        const patient = this.patientRepository.create({
            name: patientDto.name,
            address: patientDto.address,
            major: patientDto.major,
            phone: patientDto.phone,
            studentId: patientDto.studentId,
            allergy: patientDto.allergy,
        });

        const result = await this.patientRepository.save(patient);

        return {
            message: "Patient registered successfully",
            patientId: result.id,
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
