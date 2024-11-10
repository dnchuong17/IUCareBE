import {IsNotEmpty, IsString} from "class-validator";

export class DoctorDto {
    @IsString()
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
    @IsNotEmpty()
    phone: string;
}