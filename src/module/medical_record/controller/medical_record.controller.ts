import {Body, Controller, Get, Param, Patch, Post} from "@nestjs/common";
import {MedicalRecordService} from "../service/medical_record.service";
import {MedicalRecordDto} from "../dto/medical_record.dto";

@Controller('medical_record')
export class MedicalRecordController {
    constructor(private readonly medicalRecordService: MedicalRecordService) {}

    @Patch('create/:id')
    createMedicalRecord(@Body() medicalRecordDto: MedicalRecordDto, @Param('id') id: number){
        return this.medicalRecordService.createMedicalRecord( medicalRecordDto, id);
    }
}