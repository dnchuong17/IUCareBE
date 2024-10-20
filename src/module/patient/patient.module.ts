import {Module} from "@nestjs/common";
import {PatientController} from "./patient.controller";
import {PatientService} from "./patient.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PatientEntity} from "../entities/patient.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PatientEntity])],
    controllers: [PatientController],
    providers: [PatientService],
})

export class PatientModule {}