import {IsNotEmpty, IsString} from "class-validator";
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {InsuranceEntity} from "./insurance.entity";
import {AppointmentEntity} from "./appointment.entity";

@Entity('patient')
export class PatientEntity extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'patient_id'})
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'patient_name',nullable: false, type: 'varchar', length: 255})
    name: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'patient_address',nullable: false, type: 'varchar', length: 255})
    address: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'patient_major',nullable: false, type: 'varchar', length: 255})
    major: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'patient_phone',nullable: false, type: 'varchar', length: 255})
    phone: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'student_id',nullable: false, type: 'varchar', length: 255})
    studentId: string;

    @OneToMany(()=> InsuranceEntity, (insurance) => insurance.patient)
    insurances: InsuranceEntity[];

    @OneToMany(() => AppointmentEntity, appointments => appointments.patient)
    appointments: AppointmentEntity[];

}