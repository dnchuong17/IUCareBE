import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('medical_record')
export class Medical_recordEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    patientId: number;

    @Column()
    doctorId: number;

    @Column()
    treatment: string;

    @Column()
    diagnosis: string;

    @Column()
    date: Date;
}