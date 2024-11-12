import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AppointmentEntity} from "./appointment.entity";
import {Medical_recordEntity} from "./medical_record.entity";

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

    @ManyToOne(() => Medical_recordEntity, (record) => record.medicines)
    records: Medical_recordEntity;
}