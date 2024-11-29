import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DoctorEntity} from "../../doctor/entity/doctor.entity";

@Entity('department')
export class DepartmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'department_id'})
    id: number;

    @Column({name: 'department_name',nullable: false, type: 'varchar', length: 255})
    name: string;

    @Column({name: 'department_number',nullable: false})
    number: number;

    @OneToMany(() => DoctorEntity, (doctors) => doctors.department)
    doctors: DoctorEntity[];
}