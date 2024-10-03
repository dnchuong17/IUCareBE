import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MedicineEntity} from "./medicine.entity";

@Entity('appointment')
export class AppointmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time: string;

    @Column()
    status: string;

    @Column()
    doctorId: number;

    @Column()
    patientId: number;

    @OneToMany(type => MedicineEntity, medicine => medicine.appointment)
    medicines: MedicineEntity[];
}