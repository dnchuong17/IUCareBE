import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class SignInDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    account: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}