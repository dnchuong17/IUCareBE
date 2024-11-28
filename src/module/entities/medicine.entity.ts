import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AppointmentEntity} from "./appointment.entity";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Medical_recordEntity} from "./medical_record.entity";

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

    @ManyToOne(() => Medical_recordEntity, (record) => record.medicines)
    records: Medical_recordEntity;
}