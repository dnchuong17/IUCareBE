import {IsNotEmpty, IsString} from "class-validator";
import {PatientEntity} from "../entities/patient.entity";

export class InsuranceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    insuranceNumber: string;

    @IsString()
    @IsNotEmpty()
    registeredHospital: string;

    patient: PatientEntity;
}