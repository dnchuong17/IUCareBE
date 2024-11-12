import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MedicineEntity} from "./medicine.entity";

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

    @OneToMany(type => MedicineEntity, medicine => medicine.records)
    medicines: MedicineEntity[];
}