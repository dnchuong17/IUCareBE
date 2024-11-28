import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MedicineEntity} from "./medicine.entity";
import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

@Entity('medical_record')
export class Medical_recordEntity extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'medical_record_id'})
    id: number;

    @IsNumber()
    @IsNotEmpty()
    @Column({name: 'patient_id',nullable: false})
    patientId: number;

    @IsNumber()
    @IsNotEmpty()
    @Column({name: 'doctor_id',nullable: false})
    doctorId: number;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'treatment',nullable: false, type: 'varchar', length: 255})
    treatment: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'diagnosis',nullable: false, type: 'varchar', length: 255})
    diagnosis: string;

    @IsDate()
    @IsNotEmpty()
    @Column({name: 'date',nullable: false})
    date: Date;

    @OneToMany(type => MedicineEntity, medicine => medicine.records)
    medicines: MedicineEntity[];
}