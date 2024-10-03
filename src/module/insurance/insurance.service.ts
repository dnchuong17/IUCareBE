import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {InsuranceEntity} from "../entities/insurance.entity";
import {Repository} from "typeorm";
import {InsuranceDto} from "../dto/insurance.dto";

@Injectable()
export class InsuranceService {
    constructor(@InjectRepository(InsuranceEntity)
    private readonly insuranceRepository: Repository<InsuranceEntity>) {
    }

    async createInsurance(insuranceDto: InsuranceDto): Promise<void> {
        const existingInsurance = await this.insuranceRepository.findOne({
            where: { insuranceNumber: insuranceDto.insuranceNumber}
        })
        if (existingInsurance) throw new Error("Non-available insurance")
        else {
            try {
                const newInsurance = await this.insuranceRepository.create(insuranceDto);
                await this.insuranceRepository.createQueryBuilder()
                    .insert()
                    .into(InsuranceEntity)
                    .values(newInsurance)
                    .execute()
            } catch (error) {
                throw new BadRequestException(error);
            }
        }
    }
}