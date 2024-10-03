import {BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {InsuranceEntity} from "./insurance.entity";
@Entity('patient')
export class PatientEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    patientName: string;

    @Column()
    address: string;

    @Column()
    major: string;

    @Column()
    phone: string;

    @Column()
    account: string;

    @Column()
    password: string;

    @OneToMany(()=> InsuranceEntity, (insurance) => insurance.patient)
    insurances: InsuranceEntity[]

}
