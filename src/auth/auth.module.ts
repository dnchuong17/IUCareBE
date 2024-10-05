import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {PatientModule} from "../module/patient/patient.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import * as process from "process";
import {AuthGuard} from "./auth.guard";
import {APP_GUARD} from "@nestjs/core";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PatientEntity} from "../module/entities/patient.entity";
import {PatientService} from "../module/patient/patient.service";


@Module({
  imports: [PatientModule,
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRETKEY,
    signOptions: {expiresIn: '3600s'}
  }), TypeOrmModule.forFeature([PatientEntity])],
  providers: [AuthService, JwtService, PatientService, {
    provide: APP_GUARD,
    useClass: AuthGuard
    }],
  controllers: [AuthController],
  exports: [AuthService, ]
})
export class AuthModule {
}
