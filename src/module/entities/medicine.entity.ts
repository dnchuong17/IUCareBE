import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AppointmentEntity} from "./appointment.entity";

@Entity('medicine')
export class MedicineEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameMedicine: string;

    @Column()
    amount: number;

    @Column()
    price: string;

    @ManyToOne(() => AppointmentEntity, appointment => appointment.medicines)
    appointment: AppointmentEntity;
}