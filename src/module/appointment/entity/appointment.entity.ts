import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MedicineEntity} from "../../medicine/entity/medicine.entity";
import {AppointmentConstant} from "../utils/appointment.constant";
import {IsDate, IsNotEmpty, IsNumber, Min} from "class-validator";
import {DoctorEntity} from "../../doctor/entity/doctor.entity";
import {PatientEntity} from "../../patient/entity/patient.entity";

@Entity('appointment')
export class AppointmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'appointment_id'})
    id: number;

    @IsDate()
    @Column({name: 'appointment_time', nullable:false})
    time: Date;

    @Column({name: 'appointment_status',default: AppointmentConstant.APPROVED})
    status: AppointmentConstant;

    @ManyToOne(()=> DoctorEntity, doctor => doctor.appointments)
    doctor: DoctorEntity;

  @ManyToOne(()=> PatientEntity, patient => patient.appointments)
    patient: PatientEntity;
}