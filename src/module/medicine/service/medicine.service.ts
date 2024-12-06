import {Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";
import {MedicineDto} from "../dto/medicine.dto";

@Injectable()
export class MedicineService {
    constructor(private readonly dataSource: DataSource) {
    }
    async searchMedicine(medicineName: string) {
        const query = `
        SELECT 
            medicine_id, name_medicine 
        FROM 
            medicine 
        WHERE 
        name_medicine ILIKE $1
        `;
        const result = await this.dataSource.query(query, [`%${medicineName}%`]);
        return result.map((item) => ({
            id: item.medicine_id,
            name: item.name_medicine,
        }));
    }

    async addMedicinesToRecord(medicalRecordId: number, medicineIds: number[]) {
        const insertMedicinesQuery = `
        INSERT INTO medicine_record (medical_record_id, medicine_id)
        VALUES ($1, $2)
    `;

        for (const medicineId of medicineIds) {
            await this.dataSource.query(insertMedicinesQuery, [medicalRecordId, medicineId]);
        }

        return {
            message: `Medicines added to medical record ID ${medicalRecordId} successfully.`,
        };
    }

}