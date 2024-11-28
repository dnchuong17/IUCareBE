import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DoctorEntity} from "../entities/doctor.entity";
import {Repository} from "typeorm";
import {DoctorDto} from "../dto/doctor.dto";
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorService {
    constructor(@InjectRepository(DoctorEntity)
    private readonly doctorEntityRepository: Repository<DoctorEntity>,
                private readonly dataSource: DataSource) {
    }

    async findDoctorWithAccount(doctorAccount: string): Promise<DoctorEntity> {
        const dataSource = this.dataSource;

        const query = `
        SELECT * FROM doctor WHERE account = $1
    `;

        const doctor = await dataSource.query(query, [doctorAccount]);

        if (doctor.length === 0) {
            throw new NotFoundException(`Doctor with account ${doctorAccount} not found.`);
        }
        return doctor[0];
    }

    async doctorRegister(doctorDto: DoctorDto) {
        const dataSource = this.dataSource; // assuming you inject or have access to the DataSource

        const accountCheckQuery = `SELECT 1 FROM doctor WHERE account = $1`;
        const accountInUse = await dataSource.query(accountCheckQuery, [doctorDto.account]);

        if (accountInUse.length > 0) {
            throw new Error("Account already exists");
        }
        const hashedPassword = await bcrypt.hash(doctorDto.password, 10);

        const insertDoctorQuery = `
        INSERT INTO doctor (doctorName, address, phone, account, password, departmentId)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;
        const newDoctor = await dataSource.query(insertDoctorQuery, [
            doctorDto.doctorName,
            doctorDto.address,
            doctorDto.phone,
            doctorDto.account,
            hashedPassword,
            doctorDto.departmentId
        ]);

        return {
            message: "Registered successfully",
            doctorId: newDoctor[0].id
        };
    }
}