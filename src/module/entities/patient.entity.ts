import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}