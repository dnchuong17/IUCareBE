import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PatientEntity} from "../entities/patient.entity";
import {Repository} from "typeorm";
import {PatientDto} from "../dto/patient.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class PatientService {
    constructor(@InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>) {
    }

    async findPatientWithAccount(patientAccount: string){
        const patient = await this.patientRepository.findOne( {where: {account: patientAccount}})
        console.log(patient);
        return patient;

    }

    async patientRegister(patientDto: PatientDto){
        const existingUser = await this.patientRepository.findOne( {where: { account: patientDto.account }})
        if (existingUser) throw Error("Account existed")
        else {
            const hashedPassword = await bcrypt.hash(patientDto.password, 10);
            try {
                const newPatient= await this.patientRepository.create({...patientDto, password: hashedPassword});
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
                throw new UnauthorizedException(error);
            }

            }
    }

}