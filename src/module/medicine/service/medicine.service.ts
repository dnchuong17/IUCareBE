import {Injectable} from "@nestjs/common";

@Injectable()
export class MedicineService {
    async createMedicine(): Promise<void> {
        console.log("medicine created");
    }
}