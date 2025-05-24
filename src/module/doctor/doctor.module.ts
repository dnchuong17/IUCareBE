import {Module} from "@nestjs/common";
import {DoctorController} from "./controller/doctor.controller";
import {DoctorService} from "./service/doctor.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import {DoctorEntity} from "./entity/doctor.entity";
import {InsuranceModule} from "../insurance/insurance.module";
import {RedisHelper} from "../redis/redis.service";
import {CacheModule} from "@nestjs/cache-manager";
import {DoctorHandler} from "./handler/doctor.handler";

@Module({
    imports: [TypeOrmModule.forFeature([DoctorEntity]), InsuranceModule, CacheModule.register({ isGlobal: true })],
    controllers: [DoctorController, DoctorHandler],
    providers: [DoctorService, RedisHelper],
    exports: [DoctorService]
})

export class DoctorModule {

}