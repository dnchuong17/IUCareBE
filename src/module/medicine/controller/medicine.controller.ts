import {Body, Controller, Get, Post} from "@nestjs/common";
import {MedicineService} from "../service/medicine.service";
import {MedicineDto} from "../dto/medicine.dto";

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}


    @Get()
    getMedicine(@Body() medicineName: string) {
        return this.medicineService.getMedicine(medicineName);
    }
}