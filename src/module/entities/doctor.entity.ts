import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {InsuranceEntity} from "./insurance.entity";
import {DepartmentEntity} from "./department.entity";
@Entity('doctor')
export class DoctorEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    doctorName: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    account: string;

    @Column()
    password: string;

    @ManyToOne(() => DepartmentEntity, (department) => department.doctors)
    department: DepartmentEntity;
}
