import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppointmentService} from "./service/appointment.service";
import {AppointmentController} from "./controller/appointment.controller";
import {AppointmentEntity} from "./entity/appointment.entity";
import {DateUtils} from "../../common/utils/date.utils";
import {Medical_recordEntity} from "../medical_record/entity/medical_record.entity";
import {MedicalRecordService} from "../medical_record/service/medical_record.service";

@Module({
    imports: [TypeOrmModule.forFeature([AppointmentEntity, Medical_recordEntity])],
    controllers: [AppointmentController],
    providers: [AppointmentService, DateUtils, MedicalRecordService],
})

export class AppointmentModule {}