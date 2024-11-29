import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DepartmentEntity} from "./entity/department.entity";
import {DepartmentController} from "./controller/department.controller";
import {DepartmentService} from "./service/department.service";

@Module({
    imports: [TypeOrmModule.forFeature([DepartmentEntity])],
    controllers: [DepartmentController],
    providers: [DepartmentService],
})
export class DepartmentModule {}