import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class MedicalRecordDto{

    @IsNumber()
    @IsNotEmpty()
    patientId: number;

    @IsNumber()
    @IsNotEmpty()
    doctorId: number;

    @IsString()
    @IsNotEmpty()
    treatment: string;

    @IsString()
    @IsNotEmpty()
    diagnosis: string;

    @IsDate()
    @IsNotEmpty()
    date: Date;
}