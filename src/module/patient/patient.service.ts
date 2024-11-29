import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PatientEntity} from "../entities/patient.entity";
import {DataSource, Repository} from "typeorm";
import {PatientDto} from "../dto/patient.dto";

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(PatientEntity) private readonly patientRepository: Repository<PatientEntity>,
        private readonly dataSource: DataSource,
    ) {
    }

    async findStudentBySID(studentId: string): Promise<boolean> {
        const query = `SELECT 1 FROM patient WHERE student_id = $1`;
        const result = await this.dataSource.query(query, [studentId]);
        return result.length > 0;
    }


    async createPatient(patientDto: PatientDto) {
        const patientExisted = await this.findStudentBySID(patientDto.studentId);
        if (patientExisted) {
            throw new BadRequestException('Patient already exists');
        }

        const insertPatientQuery = `
        INSERT INTO patient (patient_name, patient_address, patient_major, patient_phone, student_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING patient_id
    `;

        const result = await this.dataSource.query(insertPatientQuery, [
            patientDto.name,
            patientDto.address,
            patientDto.major,
            patientDto.phone,
            patientDto.studentId,
        ]);

        return {
            message: "Patient registered successfully",
            patientId: result[0].patient_id,
        };
    }
}