import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignInDto} from "../module/dto/signIn.dto";
import {DoctorDto} from "../module/dto/doctor.dto";
import {DoctorService} from "../module/doctor/doctor.service";
import {Public} from "./public.decorator";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
    private readonly doctorService: DoctorService) {
    }
    @Public()
    @Post('doctorRegister')
    async register(@Body() doctorDto: DoctorDto) {
        return await this.doctorService.doctorRegister(doctorDto);
    }

    @Public()
    @Post('doctorLogin')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.validateDoctor(signInDto.account, signInDto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.doctor;
    }
}


