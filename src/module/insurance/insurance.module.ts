import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {InsuranceEntity} from "../entities/insurance.entity";
import {InsuranceService} from "./insurance.service";

@Module({
    imports: [TypeOrmModule.forFeature([InsuranceEntity])],
    providers: [InsuranceService],
    exports: [InsuranceModule]
})

export class InsuranceModule {}