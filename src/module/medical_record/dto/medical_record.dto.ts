import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class MedicalRecordDto{

    patientId?: number;

    doctorId?: number;

    @IsString()
    treatment?: string;

    @IsString()
    diagnosis?: string;

    date?: Date;
}