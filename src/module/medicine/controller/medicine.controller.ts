import {Controller, Get, Query} from "@nestjs/common";
import {MedicineService} from "../service/medicine.service";

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}

    @Get()
    async getMedicine(@Query('name_medicine') name_medicine: string) {
        return await this.medicineService.getMedicine(name_medicine);
    }
}