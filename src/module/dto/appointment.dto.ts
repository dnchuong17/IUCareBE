import {AppointmentConstant} from "../../common/constant/appointment.constant";
import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class AppointmentDto {

    @IsNumber()
    @IsNotEmpty()
    doctorId: number;

    @IsNumber()
    @IsNotEmpty()
    patientId: number;

    @IsString()
    @IsNotEmpty()
    time: string;

    status?: AppointmentConstant;
}