import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppointmentService} from "./appointment.service";
import {AppointmentController} from "./appointment.controller";
import {AppointmentEntity} from "../entities/appointment.entity";
import {DateUtils} from "../../common/utils/date.utils";

@Module({
    imports: [TypeOrmModule.forFeature([AppointmentEntity])],
    controllers: [AppointmentController],
    providers: [AppointmentService, DateUtils],
})

export class AppointmentModule {}