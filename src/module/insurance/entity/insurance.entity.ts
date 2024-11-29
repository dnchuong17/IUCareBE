import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PatientEntity} from "../../patient/entity/patient.entity";
import {IsNotEmpty, IsString} from "class-validator";

@Entity("insurance")
export class InsuranceEntity extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'insurance_id'})
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'insurance_number',nullable: false, type: 'varchar', length: 255})
    insuranceNumber: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'insurance_name',nullable: false, type: 'varchar', length: 255})
    insuranceName: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'registered_hospital',nullable: false, type: 'varchar', length: 255})
    registeredHospital: string;

    @ManyToOne(() => PatientEntity, (patient) => patient.insurances)
    patient: PatientEntity;
}