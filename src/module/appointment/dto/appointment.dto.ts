import {AppointmentConstant} from "../utils/appointment.constant";
import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class AppointmentDto {

    @IsNotEmpty()
    doctorId: number;


    @IsNotEmpty()
    patientId: number;

    @IsNotEmpty()
    time: Date;

    status?: AppointmentConstant;
}