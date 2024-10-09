import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("insurance")
export class InsuranceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    insuranceNumber: string;

    @Column()
    insuranceName: string;

    @Column()
    registeredHospital: string;
}