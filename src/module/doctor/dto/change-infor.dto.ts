import {IsEmail, IsNotEmpty, IsString, Max} from "class-validator";

export class DoctorDto {

    password: string;

    address: string;

    phone: string;

    departmentId: number;
}