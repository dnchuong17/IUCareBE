import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinTable,
    OneToOne,
    JoinColumn
} from "typeorm";
import {MedicineEntity} from "../../medicine/entity/medicine.entity";
import {IsDate, IsNotEmpty, IsString} from "class-validator";
import {DoctorEntity} from "../../doctor/entity/doctor.entity";
import {PatientEntity} from "../../patient/entity/patient.entity";
import {AppointmentEntity} from "../../appointment/entity/appointment.entity";

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

    @Column({name: 'suggest', nullable: true, type: 'varchar', length:255})
    suggest: string;

    @ManyToMany(type => MedicineEntity, medicines => medicines.records)
    @JoinTable({
        name: 'has',
        joinColumn: {
            name: 'medical_record_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'medicine_id',
            referencedColumnName: 'id',
        },
    })
    medicines: MedicineEntity[];

    @ManyToOne(()=> DoctorEntity, doctor => doctor.records)
    doctor: DoctorEntity;

    @ManyToOne(() => PatientEntity, patient => patient.records)
    patient: PatientEntity;

    @OneToOne(() => AppointmentEntity, (appointment) => appointment.record)
    @JoinColumn()
    appointment: AppointmentEntity;
}