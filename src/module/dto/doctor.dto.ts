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
    doctorName: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @Max(11)
    @IsNotEmpty()
    phone: string;
}