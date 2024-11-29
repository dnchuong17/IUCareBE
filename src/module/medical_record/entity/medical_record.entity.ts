import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MedicineEntity} from "../../medicine/entity/medicine.entity";
import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {DoctorEntity} from "../../doctor/entity/doctor.entity";
import {PatientEntity} from "../../patient/entity/patient.entity";

@Entity('medical_record')
export class Medical_recordEntity extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'medical_record_id'})
    id: number;

    @IsString()
    @Column({name: 'treatment',nullable: true, type: 'varchar', length: 255})
    treatment: string;

    @IsString()
    @Column({name: 'diagnosis',nullable: true, type: 'varchar', length: 255})
    diagnosis: string;

    @IsDate()
    @IsNotEmpty()
    @Column({name: 'date',nullable: false})
    date: Date;

    @OneToMany(type => MedicineEntity, medicine => medicine.records)
    medicines: MedicineEntity[];

    @ManyToOne(()=> DoctorEntity, doctor => doctor.records)
    doctor: DoctorEntity;

    @ManyToOne(() => PatientEntity, patient => patient.records)
    patient: PatientEntity;
}