import {Module} from "@nestjs/common";
import {PatientController} from "./controller/patient.controller";
import {PatientService} from "./service/patient.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PatientEntity} from "./entity/patient.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PatientEntity])],
    controllers: [PatientController],
    providers: [PatientService],
})

export class PatientModule {}