import {Controller} from "@nestjs/common";
import {DoctorService} from "../service/doctor.service";
import {TracingLogger} from "common_be";
import {MessagePattern, Transport} from "@nestjs/microservices";
import {DoctorConstant} from "../doctor.constant";

@Controller()
export class DoctorHandler {
    constructor(
        private readonly doctorService: DoctorService,
        private readonly  logger: TracingLogger,
    ) {
        this.logger.setContext(DoctorHandler.name);
    }

    @MessagePattern(DoctorConstant.GET_DOCTOR_INFO)
    async getAllDoctorIno(){
        try{
            return await this.doctorService.getAllDoctorInfo();
        }catch (e) {
            throw e;
        }
    }
}