import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
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

    @Column()
    insurance_id: number;
}
