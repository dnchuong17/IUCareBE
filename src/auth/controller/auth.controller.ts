import {Body, Controller, Get, Param, Post, Request} from '@nestjs/common';

import {SignInDto} from "../../common/constant/signIn.dto";
import {DoctorDto} from "../../module/doctor/dto/doctor.dto";
import {DoctorService} from "../../module/doctor/service/doctor.service";
import {Public} from "../decorator/public.decorator";
import {AuthService} from "../service/auth.service";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly doctorService: DoctorService) {
    }

    @Public()
    @Post('doctorRegister')
    register(@Body() doctorDto: DoctorDto) {
        return this.doctorService.doctorRegister(doctorDto);
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


