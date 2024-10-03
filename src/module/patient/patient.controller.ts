import {Body, Controller, Get, Post} from "@nestjs/common";
import {PatientService} from "./patient.service";
import {PatientDto} from "../dto/patient.dto";

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}


}