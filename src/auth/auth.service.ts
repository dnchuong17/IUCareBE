import { Injectable, UnauthorizedException} from '@nestjs/common';
import {PatientService} from "../module/patient/patient.service";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(private readonly patientService: PatientService,
    private readonly jwtService: JwtService,
                private readonly configService: ConfigService) {
    }

    async validatePatient(account: string, password: string) {
        const patient = await this.patientService.findPatientWithAccount(account);
        if (!patient) {
            console.log('Patient not found');
            throw new UnauthorizedException('Invalid account or password');
        }
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid account or password');
        }

        const payload = {
            sub: patient.id,
            account: patient.account,
            name: patient.patientName,
            major: patient.major
        };

        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRETKEY'),
            }), //signAsync() function to generate our JWT
        };
    }

}
