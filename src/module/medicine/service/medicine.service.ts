import {Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";
import {MedicineDto} from "../dto/medicine.dto";

@Injectable()
export class MedicineService {
    constructor(private readonly dataSource: DataSource) {
    }
    async searchMedicine(medicineName: string) {
        const query = 'SELECT name_medicine FROM medicine WHERE name_medicine ILIKE $1';
        const result = await this.dataSource.query(query, [`%${medicineName}%`]);
        return result.map((item) => item.name_medicine);
    }
}