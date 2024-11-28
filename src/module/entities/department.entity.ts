import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DoctorEntity} from "./doctor.entity";

@Entity('department')
export class DepartmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    number: number;

    @OneToMany(() => DoctorEntity, (doctors) => doctors.department)
    doctors: DoctorEntity[];
}