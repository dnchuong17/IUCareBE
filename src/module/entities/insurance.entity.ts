import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, IsString} from "class-validator";

@Entity("insurance")
export class InsuranceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    insuranceNumber: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    insuranceName: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    registeredHospital: string;
}