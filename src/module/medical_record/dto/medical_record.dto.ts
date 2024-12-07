import {IsArray, IsNumber, IsOptional, IsString} from "class-validator";

export class MedicalRecordDto{
    @IsString()
    treatment?: string;

    @IsString()
    diagnosis?: string;

    date?: Date;

    suggest: string;

    appointmentId: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true }) // Each item must be a number
    medicines?: number[];
}