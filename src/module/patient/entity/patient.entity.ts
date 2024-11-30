import {IsNotEmpty, IsString} from "class-validator";
import {BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {InsuranceEntity} from "../../insurance/entity/insurance.entity";
import {AppointmentEntity} from "../../appointment/entity/appointment.entity";
import {Medical_recordEntity} from "../../medical_record/entity/medical_record.entity";

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

    @Column({name: 'allergy',nullable:true, type: 'varchar', length: 255})
    allergy: string;

    @OneToMany(()=> InsuranceEntity, (insurance) => insurance.patient)
    @JoinColumn()
    insurances: InsuranceEntity[];

    @OneToMany(() => Medical_recordEntity, records => records.patient)
    records: Medical_recordEntity[];

    @OneToMany(() => AppointmentEntity, appointments => appointments.patient)
    appointments: AppointmentEntity[];

}