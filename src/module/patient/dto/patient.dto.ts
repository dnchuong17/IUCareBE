import {IsNotEmpty, IsString, Max} from "class-validator";

export class PatientDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsString()
    major: string;

    @IsString()
    phone: string;

    @IsString()
    studentId: string;

    allergy: string;
}