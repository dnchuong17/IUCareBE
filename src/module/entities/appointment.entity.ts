import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MedicineEntity} from "./medicine.entity";
import {AppointmentConstant} from "../../common/constant/appointment.constant";
import {IsDate, IsNotEmpty, IsNumber, Min} from "class-validator";

@Entity('appointment')
export class AppointmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDate()
    @Column()
    time: Date;

    @Column({default: AppointmentConstant.APPROVED})
    status: AppointmentConstant;

    @IsNumber()
    @Column()
    doctorId: number;

    @IsNumber()
    @IsNotEmpty()
    @Column()
    patientId: number;

    @OneToMany(type => MedicineEntity, medicine => medicine.appointment)
    medicines: MedicineEntity[];
}