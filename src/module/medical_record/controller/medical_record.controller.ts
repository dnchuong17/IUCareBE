import {Body, Controller, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {MedicalRecordService} from "../service/medical_record.service";
import {MedicalRecordDto} from "../dto/medical_record.dto";
import {Public} from "../../../auth/decorator/public.decorator";
import {DateUtils} from "../../../common/utils/date.utils";

@Controller('medical_record')
export class MedicalRecordController {
    constructor(private readonly medicalRecordService: MedicalRecordService,
    private readonly dateUtils: DateUtils) {}


    @Public()
    @Get('records/:id')
    getAllRecord(@Param('id') id: number) {
        return this.medicalRecordService.getAllRecords(id);
    }

    @Public()
    @Get('previous_record/:id')
    getPreviousRecord(@Param('id')id: number,@Query('date') date: string) {
        const formatDate = this.dateUtils.formatStringToDate(date);
        return this.medicalRecordService.getPreviousRecord(id,formatDate);
    }

    @Patch('create/:id')
    createMedicalRecord(@Body() medicalRecordDto: MedicalRecordDto, @Param('id') id: number){
        return this.medicalRecordService.createMedicalRecord( medicalRecordDto, id);
    }

    @Public()
    @Get('get/:id')
    getRecordByAppointmentId(@Param('id') id: number) {
        return this.medicalRecordService.getRecordByAppointmentId(id);
    }


    @Public()
    @Get('get/detail/:id')
    getRecordDetail(@Param('id') id: number) {
        return this.medicalRecordService.recordDetails(id);
    }

}