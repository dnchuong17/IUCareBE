import {Module} from "@nestjs/common";
import {DoctorController} from "./doctor.controller";
import {DoctorService} from "./doctor.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import {DoctorEntity} from "../entities/doctor.entity";
import {InsuranceModule} from "../insurance/insurance.module";

@Module({
    imports: [TypeOrmModule.forFeature([DoctorEntity]), InsuranceModule],
    controllers: [DoctorController],
    providers: [DoctorService, DoctorEntity],
    exports: [DoctorService, DoctorEntity]
})

export class DoctorModule {

}