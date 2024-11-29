import {Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";

@Injectable()
export class MedicineService {
    constructor(private readonly dataSource: DataSource) {
    }
    async getMedicine(medicineName: string) {
        const query = 'SELECT name_medicine FROM medicine WHERE name_medicine ILIKE $1';
        const result = await this.dataSource.query(query, [`%${medicineName}%`]);

        // Trả về danh sách tên thuốc
        return result.map((item) => item.name_medicine);
    }


}