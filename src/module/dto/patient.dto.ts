import {Column} from "typeorm";

export class PatientDto {
    patientName: string;
    address: string;
    major: string;
    phone: string;
    insurance_id: number;

}