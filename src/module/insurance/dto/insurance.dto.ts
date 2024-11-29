import {IsNotEmpty, IsString} from "class-validator";
import {PatientEntity} from "../../patient/entity/patient.entity";

export class InsuranceDto {
    @IsString()
    @IsNotEmpty()
    insuranceName: string;

    @IsString()
    @IsNotEmpty()
    insuranceNumber: string;

    @IsString()
    @IsNotEmpty()
    registeredHospital: string;

    patientId: number;
}