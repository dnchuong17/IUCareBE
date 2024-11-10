import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, IsString} from "class-validator";

@Entity('patient')
export class PatientEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    address: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    major: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'student_id'})
    studentId: string;
}