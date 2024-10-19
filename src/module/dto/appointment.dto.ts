import {AppointmentConstant} from "../../common/constant/appointment.constant";
import {IsDate} from "class-validator";
import {Type} from "class-transformer";

export class AppointmentDto {
    doctorId: number;
    patientId: number;
    time: string;
    status: AppointmentConstant;
}