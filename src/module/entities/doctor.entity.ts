import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
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

    @Column()

    department_id: number;
}
