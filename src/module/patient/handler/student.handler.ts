import {Controller} from "@nestjs/common";
import {TracingLogger} from "common_be";
import {MessagePattern} from "@nestjs/microservices";
import {PatientConstant} from "../patient.constant";
import {PatientService} from "../service/patient.service";

@Controller()
export class PatientHandler {
    constructor(
        private readonly logger: TracingLogger,
        private readonly patientService: PatientService,
    ) {
        this.logger.setContext(PatientHandler.name);
    }

    @MessagePattern(PatientConstant.GET_STUDENT_INFO)
    async getStudentInfo (){
        try{
            const res =  await this.patientService.getAllStudentIds();
            console.log(res);
            return res;
        }catch (e) {
            throw e;
        }
    }
}