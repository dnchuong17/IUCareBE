import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';


@Injectable()
export class InsuranceService {
    constructor(private readonly dataSource: DataSource) {}

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
