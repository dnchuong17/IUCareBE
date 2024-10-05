import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignInDto} from "../module/dto/signIn.dto";
import {PatientDto} from "../module/dto/patient.dto";
import {PatientService} from "../module/patient/patient.service";
import {Public} from "./public.decorator";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
    private readonly patientService: PatientService) {
    }
    @Public()
    @Post('patientRegister')
    async register(@Body() patientDto: PatientDto) {
        return await this.patientService.patientRegister(patientDto);
    }

    @Public()
    @Post('patientLogin')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.validatePatient(signInDto.account, signInDto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.patient;
    }
}


