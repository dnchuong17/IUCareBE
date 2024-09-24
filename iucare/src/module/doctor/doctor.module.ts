import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DoctorEntity} from "../entities/doctor.entity";
import {DoctorService} from "./doctor.service";
import {DoctorController} from "./doctor.controller";

@Module({
    imports: [TypeOrmModule.forFeature([DoctorEntity])],
    controllers: [DoctorController],
    providers: [DoctorService],
})