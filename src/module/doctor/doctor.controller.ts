import {Body, Controller, Get, Post} from "@nestjs/common";
import {DoctorService} from "./doctor.service";
import {DoctorDto} from "../dto/doctor.dto";

@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}


}