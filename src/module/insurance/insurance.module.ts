import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {InsuranceEntity} from "../entities/insurance.entity";
import {InsuranceService} from "./insurance.service";
import {InsuranceController} from "./insurance.controller";

@Module({
    imports: [TypeOrmModule.forFeature([InsuranceEntity])],
    controllers: [InsuranceController],
    providers: [InsuranceService],
    exports: [InsuranceModule]
})

export class InsuranceModule {}