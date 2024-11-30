import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from "@nestjs/common";
import {InsuranceService} from "../service/insurance.service";
import {InsuranceDto} from "../dto/insurance.dto";

@Controller('insurance')
export class InsuranceController {
    constructor(private readonly insuranceService: InsuranceService) {}

    @Get(':studentId')
    findAllInsuranceByPatientId(@Param('studentId') studentId: string) {
        return this.insuranceService.findAllInsuranceByStudentId(studentId);
    }
}