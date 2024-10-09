import {Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DoctorEntity} from "../entities/doctor.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import {DoctorDto} from "../dto/doctor.dto";

@Injectable()
export class DoctorService {
    constructor(@InjectRepository(DoctorEntity)
    private readonly doctorEntityRepository: Repository<DoctorEntity>) {
    }

    async findDoctorWithAccount(doctorAccount: string){
        return await this.doctorEntityRepository.findOne({where: {account: doctorAccount}});
    }

    async doctorRegister(doctorDto: DoctorDto){
        const accountInUse = await this.doctorEntityRepository.findOne( {where: { account: doctorDto.account }})
        if (accountInUse) throw Error("Account existed")
        else {
            const hashedPassword = await bcrypt.hash(doctorDto.password, 10);
            try {
                const newDoctor= await this.doctorEntityRepository.create(
                    {...doctorDto, password: hashedPassword}
                );
                await this.doctorEntityRepository
                    .createQueryBuilder()
                    .insert()
                    .into(DoctorEntity)
                    .values(newDoctor)
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