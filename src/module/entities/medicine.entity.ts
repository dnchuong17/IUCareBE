import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AppointmentEntity} from "./appointment.entity";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

@Entity('medicine')
export class MedicineEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    nameMedicine: string;

    @IsNumber()
    @IsNotEmpty()
    @Column()
    amount: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    price: string;

    @ManyToOne(() => AppointmentEntity, appointment => appointment.medicines)
    appointment: AppointmentEntity;
}