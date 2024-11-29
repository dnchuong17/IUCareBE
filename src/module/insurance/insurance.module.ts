import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {InsuranceEntity} from "./entity/insurance.entity";
import {InsuranceService} from "./service/insurance.service";
import {InsuranceController} from "./controller/insurance.controller";

@Module({
    imports: [TypeOrmModule.forFeature([InsuranceEntity])],
    controllers: [InsuranceController],
    providers: [InsuranceService],
    exports: [InsuranceModule]
})

export class InsuranceModule {}