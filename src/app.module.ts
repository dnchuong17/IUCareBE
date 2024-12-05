import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DoctorModule} from "./module/doctor/doctor.module";
import { AuthModule } from './auth/auth.module';
import * as process from "process";
import * as dotenv from 'dotenv';
import {ConfigModule} from "@nestjs/config";
import {PatientModule} from "./module/patient/patient.module";
import {AppointmentModule} from "./module/appointment/appointment.module";
import {InsuranceModule} from "./module/insurance/insurance.module";
import {DepartmentModule} from "./module/department/department.module";
import {MedicalRecordModule} from "./module/medical_record/medical_record.module";
import {MedicineModule} from "./module/medicine/medicine.module";
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import dataSource, {dataSourceOptions} from "./config/data-source-option";
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),CacheModule.register({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      tls: true,
      ttl: +process.env.REDIS_TTL*60*20,
    }),
      DoctorModule,
      DepartmentModule,
      AuthModule,
      PatientModule,
      AppointmentModule,
      InsuranceModule,
      MedicalRecordModule,
      MedicineModule,
      ConfigModule.forRoot({
        isGlobal: true,
      })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
