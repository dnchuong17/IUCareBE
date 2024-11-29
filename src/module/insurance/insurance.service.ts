import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InsuranceDto } from "../dto/insurance.dto";
import { PatientEntity } from "../entities/patient.entity";

@Injectable()
export class InsuranceService {
    constructor(private readonly dataSource: DataSource) {}

    async createInsurance(insuranceDto: InsuranceDto): Promise<void> {
        const existingInsurance = await this.dataSource.query(
            `SELECT 1 FROM insurance WHERE insurance_number = $1 LIMIT 1;`,
            [insuranceDto.insuranceNumber]
        );

        if (existingInsurance.length > 0) {
            throw new Error('Non-available insurance');
        }

        const patient = await this.dataSource.query(
            `SELECT * FROM patient WHERE patient_id = $1;`,
            [insuranceDto.patientId]
        );

        if (patient.length === 0) {
            throw new Error('Patient not found');
        }

        await this.dataSource.query(
            `INSERT INTO insurance (insurance_number, insurance_name, registered_hospital, "patientId")
             VALUES ($1, $2, $3, $4);`,
            [
                insuranceDto.insuranceNumber,
                insuranceDto.insuranceName,
                insuranceDto.registeredHospital,
                insuranceDto.patientId,
            ]
        );
    }

    async findAllInsuranceByStudentId(studentId: string) {
        return await this.dataSource.query(
            `SELECT 
            insurance.insurance_id,
            insurance.insurance_number,
            insurance.insurance_name,
            insurance.registered_hospital,
            patient.patient_id AS "patientId",
            patient.patient_name,
            patient.patient_address,
            patient.student_id
        FROM 
            insurance 
        LEFT JOIN 
            patient ON insurance."patientId" = patient.patient_id 
        WHERE 
            patient.student_id = $1;`,
            [studentId]
        );
    }

}
