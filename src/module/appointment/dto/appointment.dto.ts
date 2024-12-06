import {AppointmentConstant} from "../utils/appointment.constant";
import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class AppointmentDto {

    doctorId: number;


    patientId: number;

    @IsNotEmpty()
    time: Date;

    status?: AppointmentConstant;
}