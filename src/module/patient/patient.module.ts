import {Module} from "@nestjs/common";
import {PatientController} from "./controller/patient.controller";
import {PatientService} from "./service/patient.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PatientEntity} from "./entity/patient.entity";
import {PatientHandler} from "./handler/student.handler";

@Module({
    imports: [TypeOrmModule.forFeature([PatientEntity])],
    controllers: [PatientController, PatientHandler],
    providers: [PatientService],
})

export class PatientModule {}