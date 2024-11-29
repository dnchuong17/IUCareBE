import {Body, Controller, Post} from "@nestjs/common";
import {PatientService} from "../service/patient.service";
import {PatientDto} from "../dto/patient.dto";
import {Public} from "../../../auth/public.decorator";

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {
    }
    @Public()
    @Post()
    createPatient(@Body() patientDto: PatientDto) {
        return this.patientService.createPatient(patientDto);
    }
}