import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MedicineEntity} from "./medicine.entity";
import {AppointmentConstant} from "../../common/constant/appointment.constant";
import {IsDate, IsNotEmpty, IsNumber, Min} from "class-validator";

@Entity('appointment')
export class AppointmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'appointment_id'})
    id: number;

    @IsDate()
    @Column({name: 'appointment_time', nullable:false})
    time: Date;

    @Column({name: 'appointment_status',default: AppointmentConstant.APPROVED})
    status: AppointmentConstant;

    @IsNumber()
    @Column({name: 'doctor_id',nullable: false})
    doctorId: number;

    @IsNumber()
    @IsNotEmpty()
    @Column({name: 'patient_id',nullable: false})
    patientId: number;
}