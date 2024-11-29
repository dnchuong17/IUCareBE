import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class ChangeInforDto {

    password?: string;

    address?: string;

    phone?: string;

    departmentId?: number;
}