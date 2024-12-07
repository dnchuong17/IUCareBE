import {IsString} from "class-validator";

export class MedicalRecordDto{
    @IsString()
    treatment?: string;

    @IsString()
    diagnosis?: string;

    date?: Date;

    suggest: string;

    appointmentId: number;

    medicines: number[];
}