import {Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService, Public} from "./auth.service";
import {SignInDto} from "../module/dto/signIn.dto";
import {AuthGuard} from "./auth.guard";
import {PatientDto} from "../module/dto/patient.dto";
import {PatientService} from "../module/patient/patient.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
    private readonly patientService: PatientService) {
    }
    @Public()
    @Post('register')
    async register(@Body() patientDto: PatientDto) {
        return await this.patientService.patientRegister(patientDto);
    }

    @Post('patientLogin')
    signIn(@Body() signInDto: SignInDto) {
        console.log('Received login request:', signInDto);
        return this.authService.validatePatient(signInDto.account, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
    @Public()
    @Get()
    findAll() {
        return [];
    }
}


