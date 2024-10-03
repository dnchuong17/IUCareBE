import {Inject, Injectable, SetMetadata, UnauthorizedException} from '@nestjs/common';
import {PatientService} from "../module/patient/patient.service";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthService {
    constructor(private readonly patientService: PatientService,
    private readonly jwtService: JwtService) {
    }

    async validatePatient(account: string, password: string) {
        console.log('Validating patient:', account);

        const patient = await this.patientService.findPatientWithAccount(account);
        if (!patient) {
            console.log('Patient not found');
            throw new UnauthorizedException('Invalid account or password');
        }
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        console.log('Is password valid:', isPasswordValid);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid account or password');
        }

        const payload = {
            sub: patient.id,
            account: patient.account,
            name: patient.patientName,
            major: patient.major,
        };
        return {
            access_token: await this.jwtService.signAsync(payload), //signAsync() function to generate our JWT
        };
    }

}
