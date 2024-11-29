import {Module} from "@nestjs/common";
import {MedicalRecordController} from "./controller/medical_record.controller";
import {MedicalRecordService} from "./service/medical_record.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Medical_recordEntity} from "./entity/medical_record.entity";
import {AppointmentService} from "../appointment/service/appointment.service";
import {AppointmentEntity} from "../appointment/entity/appointment.entity";
import {DateUtils} from "../../common/utils/date.utils";

@Module({
    imports: [TypeOrmModule.forFeature([Medical_recordEntity])],
    controllers: [MedicalRecordController],
    providers: [MedicalRecordService],
})
export class MedicalRecordModule {}