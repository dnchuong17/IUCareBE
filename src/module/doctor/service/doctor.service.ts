import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DoctorEntity} from "../entity/doctor.entity";
import {Repository} from "typeorm";
import {DoctorDto} from "../dto/doctor.dto";
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {ChangeInforDto} from "../dto/change-infor.dto";
import {RedisHelper} from "../../redis/redis.service";

@Injectable()
export class DoctorService {
    constructor(@InjectRepository(DoctorEntity)
    private readonly doctorEntityRepository: Repository<DoctorEntity>,
                private readonly dataSource: DataSource,
                private readonly redisHelper: RedisHelper) {
    }

    async findDoctorWithAccount(doctorAccount: string): Promise<DoctorEntity | null> {
        const cacheKey = `doctor:${doctorAccount}`;
        const cachedDoctor = await this.redisHelper.get<DoctorEntity>(cacheKey);

        if (cachedDoctor) {
            console.log('Found doctor from cache');
            return cachedDoctor;
        }
        const query = `SELECT * FROM doctor WHERE doctor_account = $1`;
        const doctor = await this.dataSource.query(query, [doctorAccount]);

        if (doctor.length > 0) {
            const doctorEntity = doctor[0];
            await this.redisHelper.set(cacheKey, doctorEntity);
            return doctorEntity;
        }
        return null;
    }

    async doctorRegister(doctorDto: DoctorDto) {
        const existingDoctor = await this.findDoctorWithAccount(doctorDto.account);
        if (existingDoctor) {
            return { message: 'Account already exists' };
        }

        const departmentCheckQuery = `SELECT 1 FROM department WHERE department_id = $1`;
        const departmentExists = await this.dataSource.query(departmentCheckQuery, [doctorDto.departmentId]);

        if (departmentExists.length === 0) {
            throw new Error("Department does not exist");
        }

        const hashedPassword = await bcrypt.hash(doctorDto.password, 10);

        const insertDoctorQuery = `
        INSERT INTO doctor (doctor_name, doctor_address, doctor_phone, doctor_account, doctor_password, department_id)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING doctor_id
    `;
        const newDoctor = await this.dataSource.query(insertDoctorQuery, [
            doctorDto.doctorName,
            doctorDto.address,
            doctorDto.phone,
            doctorDto.account,
            hashedPassword,
            doctorDto.departmentId,
        ]);

        return {
            message: "Registered successfully",
            doctorId: newDoctor[0].doctor_id,  // Return the doctor_id of the newly created doctor
        };
    }

    async updateDoctor(doctorId: number, changeInforDto: ChangeInforDto) {
        const doctorExistsQuery = `SELECT 1 FROM doctor WHERE doctor_id = $1`;
        const doctorExists = await this.dataSource.query(doctorExistsQuery, [doctorId]);

        if (doctorExists.length === 0) {
            throw new BadRequestException('Doctor not found');
        }

        let updateQuery = 'UPDATE doctor SET  ';
        const updateValues = [];
        let valueIndex = 1;

        if (changeInforDto.doctor_address) {
            updateQuery += `doctor_address = $${valueIndex}, `;
            updateValues.push(changeInforDto.doctor_address);
            valueIndex++;
        }

        if (changeInforDto.doctor_phone) {
            updateQuery += `doctor_phone = $${valueIndex}, `;
            updateValues.push(changeInforDto.doctor_phone);
            valueIndex++;
        }

        if (changeInforDto.doctor_password) {
            const hashedPassword = await bcrypt.hash(changeInforDto.doctor_password, 10);
            updateQuery += `doctor_password = $${valueIndex}, `;
            updateValues.push(hashedPassword);
            valueIndex++;
        }

        updateQuery = updateQuery.slice(0, -2);

        updateQuery += ` WHERE doctor_id = $${valueIndex}`;
        console.log(updateQuery);
        updateValues.push(doctorId);

        await this.dataSource.query(updateQuery, updateValues);
        return { "message": 'Doctor updated successfully' };
    }

    async getDoctorInformationById(id: number) {
        const cacheKey = `doctorId:${id}`;
        const cachedDoctor = await this.redisHelper.get(cacheKey);

        if (cachedDoctor) {
            return cachedDoctor;
        }
        const query= `
        SELECT 
            doctor.doctor_name,
            doctor.doctor_address,
            doctor.doctor_phone,
            department.department_name,
            department.department_number
        FROM doctor
        LEFT JOIN department ON doctor.department_id = department.department_id
        WHERE doctor.doctor_id = $1`;

        const doctorInfo = await this.dataSource.query(query, [id]);
        if (doctorInfo.length > 0) {
            const doctor = doctorInfo[0];
            await this.redisHelper.set(cacheKey, doctor);
            return doctor;
        }
        return null;
    }
}