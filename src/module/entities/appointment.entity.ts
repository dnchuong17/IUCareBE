import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MedicineEntity} from "./medicine.entity";
import {AppointmentConstant} from "../../common/constant/appointment.constant";
import {IsDate} from "class-validator";

@Entity('appointment')
export class AppointmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDate()
    @Column()
    time: Date;

    @Column({default: AppointmentConstant.APPROVED})
    status: AppointmentConstant;

    @Column()
    doctorId: number;

    @Column()
    patientId: number;

    @OneToMany(type => MedicineEntity, medicine => medicine.appointment)
    medicines: MedicineEntity[];
}