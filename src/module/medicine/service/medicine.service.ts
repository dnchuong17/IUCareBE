import {Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";

@Injectable()
export class MedicineService {
    constructor(private readonly dataSource: DataSource) {
    }
    async getMedicine(medicineName: string): Promise<any> {
        const query = 'SELECT name_medicine FROM medicine WHERE name_medicine ILIKE $1';
        return await this.dataSource.query(query, [`%${medicineName}%`]);
    }

}