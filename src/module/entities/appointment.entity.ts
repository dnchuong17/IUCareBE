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
    @Min(0)
    @Column()
    doctorId: number;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    @Column()
    patientId: number;

    @OneToMany(type => MedicineEntity, medicine => medicine.appointment)
    medicines: MedicineEntity[];
}