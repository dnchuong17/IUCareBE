import {Module} from "@nestjs/common";
import {MedicalRecordController} from "./controller/medical_record.controller";
import {MedicalRecordService} from "./service/medical_record.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Medical_recordEntity} from "./entity/medical_record.entity";
import {DateUtils} from "../../common/utils/date.utils";
import {RedisHelper} from "../redis/redis.service";
import {CacheModule} from "@nestjs/cache-manager";

@Module({
    imports: [TypeOrmModule.forFeature([Medical_recordEntity]),CacheModule.register({ isGlobal: true })],
    controllers: [MedicalRecordController],
    providers: [MedicalRecordService, DateUtils, RedisHelper],
})
export class MedicalRecordModule {}