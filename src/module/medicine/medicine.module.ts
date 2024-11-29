import {Module} from "@nestjs/common";
import {MedicineController} from "./controller/medicine.controller";
import {MedicineService} from "./service/medicine.service";

@Module({
    controllers: [MedicineController],
    providers: [MedicineService],
})

export class MedicineModule {

}