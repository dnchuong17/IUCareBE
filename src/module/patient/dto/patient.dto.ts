import {IsNotEmpty, IsString, Max} from "class-validator";

export class PatientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    major: string;

    @IsString()
    @Max(10)
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    studentId: string;

    allergy: string;
}