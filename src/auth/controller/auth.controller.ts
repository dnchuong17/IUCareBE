import {Body, Controller, Get, Param, Post, Request, UnauthorizedException} from '@nestjs/common';

import {SignInDto} from "../../module/doctor/dto/signIn.dto";
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
        const tokens = await this.authService.validateDoctor(signInDto.account, signInDto.password);
        return {
            message: 'Login successful',
            ...tokens,
        };
    }
    @Post('refresh-token')
    async refreshToken(@Body('refreshToken') refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required');
        }

        const result = await this.authService.refreshAccessToken(refreshToken);
        return {
            message: 'Access token refreshed successfully',
            ...result,
        };
    }


    @Get('profile')
    getProfile(@Request() req) {
        return req.doctor;
    }
}


