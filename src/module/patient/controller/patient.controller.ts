import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import {PatientService} from "../service/patient.service";
import {PatientDto} from "../dto/patient.dto";
import {Public} from "../../../auth/decorator/public.decorator";

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {
    }

    @Post('create')
    createPatient(@Body() patientDto: PatientDto) {
        return this.patientService.createPatient(patientDto);
    }


    @Get('information')
    getPatientInformation(@Query('studentId') studentId: string){
        return this.patientService.getInformationPatient(studentId);
    }

    @Get()
    async searchPatient(@Query("patientId") patientId: string){
        if (!patientId) {
            return [];
        }
        return this.patientService.searchPatient(patientId);
    }

}