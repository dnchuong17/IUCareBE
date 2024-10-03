import {Column} from "typeorm";

export class PatientDto {
    account: string;
    password: string;
    patientName: string;
    address: string;
    major: string;
    phone: string;
}