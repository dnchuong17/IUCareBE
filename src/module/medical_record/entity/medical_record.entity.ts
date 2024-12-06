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
import {AppointmentEntity} from "../../appointment/entity/appointment.entity";

@Entity('records')
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
        name: 'medicine_record',
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

    @OneToOne(() => AppointmentEntity, (appointment) => appointment.record)
    @JoinColumn()
    appointment: AppointmentEntity;
}