import {BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Medical_recordEntity} from "../../medical_record/entity/medical_record.entity";

@Entity('medicine')
export class MedicineEntity extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'medicine_id'})
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'name_medicine',nullable: false, type: 'varchar', length: 255})
    nameMedicine: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'dosage',nullable: false, type: 'varchar', length: 255})
    amount: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'usage',nullable: false, type: 'varchar', length: 255})
    usage: string

    @ManyToMany(() => Medical_recordEntity, (record) => record.medicines)
    records: Medical_recordEntity[];
}