import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {InsuranceEntity} from "./insurance.entity";
@Entity('doctor')
export class DoctorEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    doctorName: string;

    @Column()
    address: string;

    @Column()
    department_id: string;

    @Column()
    phone: string;

    @Column()
    account: string;

    @Column()
    password: string;
}
