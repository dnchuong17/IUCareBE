import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppointmentService} from "./service/appointment.service";
import {AppointmentController} from "./controller/appointment.controller";
import {AppointmentEntity} from "./entity/appointment.entity";
import {DateUtils} from "../../common/utils/date.utils";

@Module({
    imports: [TypeOrmModule.forFeature([AppointmentEntity])],
    controllers: [AppointmentController],
    providers: [AppointmentService, DateUtils],
})

export class AppointmentModule {}