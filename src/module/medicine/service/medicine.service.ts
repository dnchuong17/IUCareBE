import {Injectable} from "@nestjs/common";
import {MedicineDto} from "../dto/medicine.dto";
import {DataSource} from "typeorm";

@Injectable()
export class MedicineService {
    constructor(private readonly dataSource: DataSource) {
    }
    async getMedicine(medicineName: string) {
        const query = 'SELECT name_medicine FROM medicine WHERE name_medicine = $1';
        return this.dataSource.query(query, [medicineName]);
    }

}