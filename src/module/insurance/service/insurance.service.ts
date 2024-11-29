import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InsuranceDto } from "../dto/insurance.dto";
import { PatientEntity } from "../../patient/entity/patient.entity";

@Injectable()
export class InsuranceService {
    constructor(private readonly dataSource: DataSource) {}

    // async createInsurance(insuranceDto: InsuranceDto): Promise<void> {
    //     const existingInsurance = await this.dataSource.query(
    //         `SELECT 1 FROM insurance WHERE insurance_number = $1 LIMIT 1;`,
    //         [insuranceDto.insuranceNumber]
    //     );
    //
    //     if (existingInsurance.length > 0) {
    //         throw new Error('Non-available insurance');
    //     }
    //
    //     const patient = await this.dataSource.query(
    //         `SELECT * FROM patient WHERE patient_id = $1;`,
    //         [insuranceDto.patientId]
    //     );
    //
    //     if (patient.length === 0) {
    //         throw new Error('Patient not found');
    //     }
    //
    //     return await this.dataSource.query(
    //         `INSERT INTO insurance (insurance_number, insurance_name, registered_hospital, "patientId")
    //          VALUES ($1, $2, $3, $4);`,
    //         [
    //             insuranceDto.insuranceNumber,
    //             insuranceDto.insuranceName,
    //             insuranceDto.registeredHospital,
    //             insuranceDto.patientId,
    //         ]
    //     );
    // }

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

    // async deleteInsuranceById(patientId: number, insurance_id: number) {
    //     const existedInsurance = await this.dataSource.query(
    //         `SELECT * FROM insurance WHERE insurance_id = $1 AND "patientId" = $2`,
    //         [insurance_id, patientId]
    //     );
    //
    //     if (existedInsurance.length === 0) {
    //         throw new Error('Insurance not found');
    //     }
    //     await this.dataSource.query(
    //         `DELETE FROM insurance WHERE insurance_number = $1 AND "patientId" = $2`,
    //         [insurance_id, patientId]
    //     );
    //     return {
    //         message: `delete insurance with id: ${insurance_id} successfully!`,
    //     }
    // }

}
