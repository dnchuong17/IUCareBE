import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {MedicineService} from "../service/medicine.service";
import {Public} from "../../../auth/decorator/public.decorator";

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}

    @Public()
    @Get()
    async getMedicine(@Query("query") query: string): Promise<any> {
        if (!query) {
            return []; // Trả về danh sách rỗng nếu query trống
        }
        return this.medicineService.getMedicine(query); // Gọi service để lấy danh sách thuốc
    }
}