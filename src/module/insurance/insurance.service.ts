import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import {InsuranceDto} from "../dto/insurance.dto";

@Injectable()
export class InsuranceService {
    constructor(private readonly dataSource: DataSource) {}

    async createInsurance(insuranceDto: InsuranceDto): Promise<void> {
        const query = `
      SELECT 1 FROM insurance WHERE insurance_number = $1 LIMIT 1;
    `;
        const existingInsurance = await this.dataSource.query(query, [
            insuranceDto.insuranceNumber,
        ]);

        if (existingInsurance.length > 0) {
            throw new Error('Non-available insurance');
        }

        const insertQuery = `
      INSERT INTO insurance (insurance_number, insurance_name, registered_hospital) 
      VALUES ($1, $2, $3)
    `;
        await this.dataSource.query(insertQuery, [
            insuranceDto.insuranceNumber,
            insuranceDto.name,
            insuranceDto.registeredHospital,
        ]);
    }
}
