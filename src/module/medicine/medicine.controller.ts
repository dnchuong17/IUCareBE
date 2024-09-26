import {Controller, Post} from "@nestjs/common";
import {MedicineService} from "./medicine.service";

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}

    @Post()
    createMedicine() {
        return this.medicineService.createMedicine();
    }
}