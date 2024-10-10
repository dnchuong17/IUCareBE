import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {DoctorModule} from "../module/doctor/doctor.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import * as process from "process";
import {AuthGuard} from "./auth.guard";
import {APP_GUARD} from "@nestjs/core";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DoctorEntity} from "../module/entities/doctor.entity";
import {DoctorService} from "../module/doctor/doctor.service";


@Module({
  imports: [DoctorEntity,
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRETKEY,
    signOptions: {expiresIn: '300s'}
  }), JwtModule.register({
      global: true,
      secret: process.env.JWT_REFRESH_SECRETKEY,
      signOptions: {expiresIn: '7d'}
    }),
    TypeOrmModule.forFeature([DoctorEntity])],
  providers: [AuthService, JwtService, DoctorService, {
    provide: APP_GUARD,
    useClass: AuthGuard
    }],
  controllers: [AuthController],
  exports: [AuthService, ]
})
export class AuthModule {
}
