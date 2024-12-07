import {Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";
import {MedicineDto} from "../dto/medicine.dto";
import {query} from "express";

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

    async addMedicinesToRecord(medical_record_id: number, medicine_ids: number[]) {
        if (!medicine_ids || medicine_ids.length === 0) {
            throw new Error("No medicines to add.");
        }

        const values = medicine_ids.map((medicine_id) => `(${medical_record_id}, ${medicine_id})`).join(",");

        const insertMedicinesQuery = `
        INSERT INTO medicine_record (medical_record_id, medicine_id)
        VALUES ${values};
    `;

        try {
            await this.dataSource.query(insertMedicinesQuery);
            return {
                message: `Medicines added to medical record ID ${medical_record_id} successfully.`,
            };
        } catch (error) {
            console.error("Error inserting medicines into medicine_record:", error.message);
            throw new Error("Failed to add medicines to the medical record.");
        }
    }



}