import {Controller, Get} from "@nestjs/common";
import {MedicalRecordService} from "../service/medical_record.service";
import {MedicalRecordDto} from "../dto/medical_record.dto";

@Controller('medical_record')
export class MedicalRecordController {
    constructor(private readonly medicalRecordService: MedicalRecordService) {}

    @Get('create')
    createMedicalRecord(medicalRecordDto: MedicalRecordDto){
        return this.medicalRecordService.createMedicalRecord(medicalRecordDto);
    }
}