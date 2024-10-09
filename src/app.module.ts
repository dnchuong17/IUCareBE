import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DoctorModule} from "./module/doctor/doctor.module";
import { AuthModule } from './auth/auth.module';
import * as process from "process";
import * as dotenv from 'dotenv';
import {ConfigModule} from "@nestjs/config";

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
      DoctorModule,
      AuthModule,
      ConfigModule.forRoot({
        isGlobal: true,
      })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
