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
    async searchPatient(@Query('studentId') studentId: string) {
        if (!studentId) {
            return { message: "studentId is required" };
        }
        try {
            const patients = await this.patientService.searchPatient(studentId);
            return patients.length
                ? { data: patients }
                : { message: 'No patients found' };
        } catch (error) {
            return { message: 'An error occurred', error: error.message };
        }
    }

}