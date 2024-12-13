import {Injectable, UnauthorizedException} from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateDoctor(account: string, password: string) {
        const query = `
            SELECT * FROM doctor WHERE doctor_account = $1;
        `;

        const doctor = await this.dataSource.query(query, [account]);

        if (doctor.length === 0) {
            throw new UnauthorizedException('Invalid account or password');
        }

        const doctorRecord = doctor[0];

        const isPasswordValid = await bcrypt.compare(password, doctorRecord.doctor_password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid account or password');
        }

        const payload = {
            sub: doctorRecord.doctor_id,
            account: doctorRecord.doctor_account,
            name: doctorRecord.doctor_name,
        };

        const access_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRETKEY'),
        });

        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRETKEY'),
        });

        return {
            message: 'login successfully',
            access_token,
            refresh_token,
        };
    }

    async refreshAccessToken(refreshToken: string): Promise<{ access_token: string }> {
        const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRETKEY'),
        });

        const access_token = await this.jwtService.signAsync(
            {
                sub: payload.sub,
                account: payload.account,
                name: payload.name,
            },
            {
                secret: this.configService.get<string>('JWT_SECRETKEY'),
            },
        );
        return { access_token };
    }
}
