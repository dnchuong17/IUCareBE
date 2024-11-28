import {Body, Controller, Post} from "@nestjs/common";
import {InsuranceService} from "./insurance.service";
import {InsuranceDto} from "../dto/insurance.dto";

@Controller('insurance')
export class InsuranceController {
    constructor(private readonly insuranceService: InsuranceService) {}

    @Post('create')
    createInsurance(@Body() insuranceDto: InsuranceDto) {
        return this.insuranceService.createInsurance(insuranceDto);
    }
}