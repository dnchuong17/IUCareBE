import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AppointmentEntity} from "./appointment.entity";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Medical_recordEntity} from "./medical_record.entity";

@Entity('medicine')
export class MedicineEntity extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'medicine_id'})
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'name_medicine',nullable: false, type: 'varchar', length: 255})
    nameMedicine: string;

    @IsNumber()
    @IsNotEmpty()
    @Column({name: 'dosage',nullable: false})
    amount: number;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'price',nullable: false, type: 'varchar', length: 255})
    price: string;

    @ManyToOne(() => Medical_recordEntity, (record) => record.medicines)
    records: Medical_recordEntity;
}