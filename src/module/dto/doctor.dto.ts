import {IsEmail, IsNotEmpty, IsString, Max} from "class-validator";
import {DepartmentEntity} from "../entities/department.entity";

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
    @IsNotEmpty()
    phone: string;

    departmentId: number;
}