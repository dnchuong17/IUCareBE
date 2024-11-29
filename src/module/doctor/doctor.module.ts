import {Module} from "@nestjs/common";
import {DoctorController} from "./controller/doctor.controller";
import {DoctorService} from "./service/doctor.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import {DoctorEntity} from "./entity/doctor.entity";
import {InsuranceModule} from "../insurance/insurance.module";

@Module({
    imports: [TypeOrmModule.forFeature([DoctorEntity]), InsuranceModule],
    controllers: [DoctorController],
    providers: [DoctorService, DoctorEntity],
    exports: [DoctorService, DoctorEntity]
})

export class DoctorModule {

}