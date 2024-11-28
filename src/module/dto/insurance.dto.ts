import {IsNotEmpty, IsString} from "class-validator";

export class InsuranceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    insuranceNumber: string;

    @IsString()
    @IsNotEmpty()
    registeredHospital: string
}