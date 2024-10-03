import {Module} from "@nestjs/common";
import {PatientController} from "./patient.controller";
import {PatientService} from "./patient.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import {PatientEntity} from "../entities/patient.entity";
import {InsuranceModule} from "../insurance/insurance.module";

@Module({
    imports: [TypeOrmModule.forFeature([PatientEntity]), InsuranceModule],
    controllers: [PatientController],
    providers: [PatientService, PatientEntity],
    exports: [PatientService, PatientEntity]
})

export class PatientModule {

}