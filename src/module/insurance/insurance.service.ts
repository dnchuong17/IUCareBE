import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InsuranceDto } from "../dto/insurance.dto";
import { PatientEntity } from "../entities/patient.entity";

@Injectable()
export class InsuranceService {
    constructor(private readonly dataSource: DataSource) {}

    async createInsurance(insuranceDto: InsuranceDto): Promise<void> {
        // Step 1: Check if the insurance number already exists using raw query
        const existingInsurance = await this.dataSource.query(
            `SELECT 1 FROM insurance WHERE insurance_number = $1 LIMIT 1;`,
            [insuranceDto.insuranceNumber]
        );

        if (existingInsurance.length > 0) {
            throw new Error('Non-available insurance');
        }

        // Step 2: Find the patient by ID using raw query
        const patient = await this.dataSource.query(
            `SELECT * FROM patient WHERE patient_id = $1 LIMIT 1;`,
            [insuranceDto.patient.id]
        );

        if (patient.length === 0) {
            throw new Error('Patient not found');
        }

        // Step 3: Insert the new insurance record using raw query
        await this.dataSource.query(
            `INSERT INTO insurance (insurance_number, insurance_name, registered_hospital, patient)
             VALUES ($1, $2, $3, $4);`,
            [
                insuranceDto.insuranceNumber,
                insuranceDto.name,
                insuranceDto.registeredHospital,
                insuranceDto.patient,
            ]
        );
    }

    async FindAllInsuranceByPatientId(patientId: number): Promise<any[]> {
        return this.dataSource.query(
            `SELECT * FROM insurance WHERE patient_id = $1;`,
            [patientId]
        );
    }
}
