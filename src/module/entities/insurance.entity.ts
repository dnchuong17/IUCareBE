import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PatientEntity} from "./patient.entity";
import {IsNotEmpty, IsString} from "class-validator";

@Entity("insurance")
export class InsuranceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    insuranceNumber: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    insuranceName: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    registeredHospital: string;

    @ManyToOne(() => PatientEntity, (patient) => patient.insurances)
    patient: PatientEntity;
}