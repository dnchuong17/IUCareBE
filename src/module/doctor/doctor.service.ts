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
        SELECT * FROM doctor WHERE doctor_account = $1
    `;

        const doctor = await dataSource.query(query, [doctorAccount]);

        if (doctor.length === 0) {
            throw new NotFoundException(`Doctor with account ${doctorAccount} not found.`);
        }
        return doctor[0];
    }

    async doctorRegister(doctorDto: DoctorDto) {
        const dataSource = this.dataSource; // Assuming you have access to the DataSource

        // Step 1: Check if the account already exists
        const accountCheckQuery = `SELECT 1 FROM doctor WHERE doctor_account = $1`;
        const accountInUse = await dataSource.query(accountCheckQuery, [doctorDto.account]);

        if (accountInUse.length > 0) {
            throw new NotFoundException("Account already exists");
        }

        // Step 2: Hash the password before inserting
        const hashedPassword = await bcrypt.hash(doctorDto.password, 10);

        // Step 3: Insert the new doctor into the database
        const insertDoctorQuery = `
            INSERT INTO doctor (doctor_name, doctor_address, doctor_phone, doctor_account, doctor_password)
            VALUES ($1, $2, $3, $4, $5) RETURNING doctor_id
        `;
        const newDoctor = await dataSource.query(insertDoctorQuery, [
            doctorDto.doctorName,
            doctorDto.address,
            doctorDto.phone,
            doctorDto.account,
            hashedPassword,
        ]);

        if (newDoctor.length === 0) {
            throw new Error("Doctor registration failed");
        }

        return {
            message: "Registered successfully",
            doctorId: newDoctor[0].doctor_id
        };
    }
}