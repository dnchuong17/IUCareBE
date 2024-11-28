import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MedicineEntity} from "./medicine.entity";
import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

@Entity('medical_record')
export class Medical_recordEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNumber()
    @IsNotEmpty()
    @Column()
    patientId: number;

    @IsNumber()
    @IsNotEmpty()
    @Column()
    doctorId: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    treatment: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    diagnosis: string;

    @IsDate()
    @IsNotEmpty()
    @Column()
    date: Date;

    @OneToMany(type => MedicineEntity, medicine => medicine.records)
    medicines: MedicineEntity[];
}