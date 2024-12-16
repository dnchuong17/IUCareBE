import {Body, Controller, Get, Post, Request, Res, UnauthorizedException} from '@nestjs/common';
import { Response } from 'express';
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
    signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
        return this.authService.validateDoctor(signInDto.account, signInDto.password, res);
    }

    @Post('refresh-token')
    async refreshToken(@Body('refreshToken') refreshToken: string, @Res() res: Response) {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required');
        }

        const result = await this.authService.refreshAccessToken(refreshToken, res);
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


