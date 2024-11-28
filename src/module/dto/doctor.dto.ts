import {IsEmail, IsNotEmpty, IsString, Max} from "class-validator";

export class DoctorDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    account: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    patientName: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    departmentId: string;

    @IsString()
    @Max(11)
    @IsNotEmpty()
    phone: string;
}