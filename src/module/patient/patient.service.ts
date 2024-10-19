import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PatientEntity} from "../entities/patient.entity";
import {DataSource, Repository} from "typeorm";
import {PatientDto} from "../dto/patient.dto";

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(PatientEntity) private readonly patientRepository: Repository<PatientEntity>,
        private readonly dataSource: DataSource,
    ) {
    }

    async findStudentBySID(studentId: string) {
            const query = `SELECT student_id from patient where student_id = $1`;
            const result = await this.dataSource.query(query, [studentId]);
            return result.length > 0;
    }

    async createPatient (patientDto: PatientDto) {
        const date = new Date();
        console.log(date);
        return ;
        const patientExisted = await this.findStudentBySID(patientDto.studentId);
        if (patientExisted) {
            return 'patient existed';
        }
        else {
        try {
            const newPatient = await this.patientRepository.create(patientDto);
            await this.patientRepository
                .createQueryBuilder()
                .insert()
                .into(PatientEntity)
                .values(newPatient)
                .execute()
            return {
                message: "register successfully"
            }
        } catch (error) {
            throw new BadRequestException(error)
        }
        }
    }
}