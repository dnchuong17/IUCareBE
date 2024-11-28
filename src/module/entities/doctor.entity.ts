import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {InsuranceEntity} from "./insurance.entity";
import {IsNotEmpty, IsString} from "class-validator";
import {DepartmentEntity} from "./department.entity";
@Entity('doctor')
export class DoctorEntity extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'doctor_id'})
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'doctor_name',nullable: false, type: 'varchar', length: 255})
    doctorName: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'doctor_address',nullable: false, type: 'varchar', length: 255})
    address: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'doctor_phone',nullable: false, type: 'varchar', length: 255})
    phone: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'doctor_account',nullable: false, type: 'varchar', length: 255})
    account: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'doctor_password',nullable: false, type: 'varchar', length: 255})
    password: string;

    @ManyToOne(() => DepartmentEntity, (department) => department.doctors)
    @JoinColumn({ name: 'department_id' })
    department: DepartmentEntity;
}
