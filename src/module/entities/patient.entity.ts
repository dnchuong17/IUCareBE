import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {InsuranceEntity} from "./insurance.entity";

@Entity('patient')
export class PatientEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    major: string;

    @Column()
    phone: string;

    @Column({name: 'student_id'})
    studentId: string;

    @OneToMany(()=> InsuranceEntity, (insurance) => insurance.patient)
    insurances: InsuranceEntity[];

}