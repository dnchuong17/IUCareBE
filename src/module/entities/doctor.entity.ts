import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {InsuranceEntity} from "./insurance.entity";
import {IsNotEmpty, IsString} from "class-validator";
import {DepartmentEntity} from "./department.entity";
@Entity('doctor')
export class DoctorEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    doctorName: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    address: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    department_id: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    account: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    password: string;

    @ManyToOne(() => DepartmentEntity, (department) => department.doctors)
    department: DepartmentEntity;
}
