import {IsNotEmpty, IsString} from "class-validator";
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {InsuranceEntity} from "./insurance.entity";

@Entity('patient')
export class PatientEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    address: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    major: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'student_id'})
    studentId: string;

    @OneToMany(()=> InsuranceEntity, (insurance) => insurance.patient)
    insurances: InsuranceEntity[];

}