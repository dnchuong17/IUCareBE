import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class MedicineDto {

    @IsString()
    @IsNotEmpty()
    nameMedicine: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    price: string;

}