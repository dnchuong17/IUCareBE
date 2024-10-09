import {Body, Controller, Get, Post} from "@nestjs/common";
import {DoctorService} from "./doctor.service";
import {DoctorDto} from "../dto/doctor.dto";

@Controller('patient')
export class DoctorController {
    constructor(private readonly patientService: DoctorService) {}


}