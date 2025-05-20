import {BadRequestException, Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
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


    @Public()
    @Get('information')
    getPatientInformation(@Query('studentIds') studentIds: string) {
        if (!studentIds) {
            throw new BadRequestException('Missing query param: studentIds');
        }

        const ids = studentIds.split(',').map((id) => id.trim()).filter(id => id);
        return this.patientService.getInformationPatients(ids);
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

    @Public()
    @Get('student-ids')
    async getAllID() {
        try {
            return this.patientService.getAllStudentIds();
        } catch (error){
            throw error;
        }
    }

}