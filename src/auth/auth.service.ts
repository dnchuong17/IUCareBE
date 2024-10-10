import { Injectable, UnauthorizedException} from '@nestjs/common';
import {DoctorService} from "../module/doctor/doctor.service";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(private readonly doctorService: DoctorService,
                private readonly jwtService: JwtService,
                private readonly configService: ConfigService) {
    }

    async validateDoctor(account: string, password: string) {
       const doctor  = await this.doctorService.findDoctorWithAccount(account);
        if (!doctor) {
            throw new UnauthorizedException('Invalid account or password');
        }
        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid account or password');
        }

        const payload = {
            sub: doctor.id,
            account: doctor.account,
            name: doctor.doctorName,
            departmentId: doctor.department_id
        };

        const access_token = await this.jwtService.signAsync(payload, { ////signAsync() function to generate our JWT
            secret: this.configService.get<string>('JWT_SECRETKEY'),
        })

        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRETKEY'),
        })

        return {
            access_token: access_token,
            refresh_token: refresh_token
        };
    }
}
