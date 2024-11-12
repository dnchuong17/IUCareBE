import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PatientEntity} from "./patient.entity";

@Entity("insurance")
export class InsuranceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    insuranceNumber: string;

    @Column()
    insuranceName: string;

    @Column()
    registeredHospital: string;

    @ManyToOne(() => PatientEntity, (patient) => patient.insurances)
    patient: PatientEntity;
}