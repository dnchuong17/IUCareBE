import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import {DoctorModule} from "../module/doctor/doctor.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import * as process from "process";
import {AuthGuard} from "./guard/auth.guard";
import {APP_GUARD} from "@nestjs/core";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DoctorEntity} from "../module/doctor/entity/doctor.entity";
import {DoctorService} from "../module/doctor/service/doctor.service";


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
