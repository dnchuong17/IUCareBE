import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {PatientModule} from "../module/patient/patient.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {AuthGuard} from "./auth.guard";
import {APP_GUARD} from "@nestjs/core";


@Module({
  imports: [PatientModule,
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRETKEY,
    signOptions: {expiresIn: '3600s'}
  })],
  providers: [AuthService,{
    provide: APP_GUARD,
    useClass: AuthGuard
    }],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
