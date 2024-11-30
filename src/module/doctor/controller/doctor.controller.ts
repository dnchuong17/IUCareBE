import {Body, Controller, Get, Param, Post, Patch} from "@nestjs/common";
import {DoctorService} from "../service/doctor.service";
import {ChangeInforDto} from "../dto/change-infor.dto";

@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    @Get('account/:doctor_account')
    findDoctorByAccount(@Param('doctor_account') doctorAccount: string){
        return this.doctorService.findDoctorWithAccount(doctorAccount);
    }

    @Patch('change_information/:doctor_id')
    changeInformation(@Param('doctor_id') doctorId: number, @Body() changeInforDto: ChangeInforDto) {
        return this.doctorService.updateDoctor(doctorId, changeInforDto);
    }
    @Get(':id')
    getDoctorInformationById(@Param('id') id: number) {
        return this.doctorService.getDoctorInformationById(id);
    }

}