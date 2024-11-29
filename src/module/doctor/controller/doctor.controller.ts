import {Body, Controller, Param, Patch} from "@nestjs/common";
import {DoctorService} from "../service/doctor.service";
import {ChangeInforDto} from "../dto/change-infor.dto";

@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    @Patch('change_information/:doctor_id')
    changeInformation(@Param('doctor_id') doctorId: number, @Body() changeInforDto: ChangeInforDto) {
        return this.doctorService.updateDoctor(doctorId, changeInforDto);
    }
}