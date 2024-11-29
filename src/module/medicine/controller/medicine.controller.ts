import {Controller, Post} from "@nestjs/common";
import {MedicineService} from "../service/medicine.service";

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}

    @Post('create')
    createMedicine() {
        return this.medicineService.createMedicine();
    }
}