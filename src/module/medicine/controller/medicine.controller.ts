import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import {MedicineService} from "../service/medicine.service";
import {Public} from "../../../auth/decorator/public.decorator";

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}

    @Get()
    async getMedicine(@Query("medicine_name") medicine_name: string){
        if (!medicine_name) {
            return [];
        }
        return this.medicineService.searchMedicine(medicine_name);
    }

    @Post('/add')
    async addMedicines(
        @Body('medicalRecordId') medicalRecordId: number,
        @Body('medicineIds') medicineIds: number[]) {
        return this.medicineService.addMedicinesToRecord(medicalRecordId, medicineIds);
    }
}