import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import {PatientService} from "../service/patient.service";
import {PatientDto} from "../dto/patient.dto";
import {Public} from "../../../auth/decorator/public.decorator";

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {
    }
    @Public()
    @Post('create')
    createPatient(@Body() patientDto: PatientDto) {
        return this.patientService.createPatient(patientDto);
    }

    @Public()
    @Get('information')
    getPatientInformation(@Query('studentId') studentId: string){
        return this.patientService.getInformationPatient(studentId);
    }
}