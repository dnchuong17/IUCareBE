import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PatientEntity} from "../entity/patient.entity";
import {DataSource, Repository} from "typeorm";
import {PatientDto} from "../dto/patient.dto";

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(PatientEntity) private readonly patientRepository: Repository<PatientEntity>,
        private readonly dataSource: DataSource,
    ) {
    }

    async getInformationPatient(studentId: string) {
        const query = 'SELECT * FROM patient LEFT JOIN insurance ON patient.patient_id = insurance."patientId" WHERE patient.student_id = $1';
        const patientInfor = await this.dataSource.query(query, [studentId]);
        return patientInfor[0];
    }

    async

    async findStudentBySID(studentId: string) {
        const query = `SELECT *
                       FROM patient
                       WHERE student_id = $1`;
        const result = await this.dataSource.query(query, [studentId]);
        return result;
    }


    async createPatient(patientDto: PatientDto) {
        const patientExisted = await this.findStudentBySID(patientDto.studentId);
        if (patientExisted.length > 0) {
            throw new BadRequestException('Patient already exists');
        }

        const insertPatientQuery = `
            INSERT INTO patient (patient_name, patient_address, patient_major, patient_phone, student_id,  allergy)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING patient_id
        `;
        console.log(insertPatientQuery);

        console.log(patientDto);
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
        const query = "SELECT * FROM patient WHERE student_id ILIKE $1";
        const result = await this.dataSource.query(query, [`%${studentId}%`]);

        return result.map(patient => ({
            patientId: patient.patient_id,
            studentId: patient.student_id,
            patientName: patient.patient_name,
        }));
    }
}