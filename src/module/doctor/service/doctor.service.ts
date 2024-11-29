import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DoctorEntity} from "../entity/doctor.entity";
import {Repository} from "typeorm";
import {DoctorDto} from "../dto/doctor.dto";
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {ChangeInforDto} from "../dto/change-infor.dto";

@Injectable()
export class DoctorService {
    constructor(@InjectRepository(DoctorEntity)
    private readonly doctorEntityRepository: Repository<DoctorEntity>,
                private readonly dataSource: DataSource) {
    }

    async findDoctorWithAccount(doctorAccount: string): Promise<DoctorEntity | null> {
        const query = `
    SELECT * FROM doctor WHERE doctor_account = $1
    `;

        const doctor = await this.dataSource.query(query, [doctorAccount]);

        return doctor.length > 0 ? doctor[0] : null;
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

        let updateQuery = 'UPDATE doctor SET ';
        const updateValues: any[] = [];
        let valueIndex = 1;

        if (changeInforDto.address) {
            updateQuery += `doctor_address = $${valueIndex}, `;
            updateValues.push(changeInforDto.address);
            valueIndex++;
        }

        if (changeInforDto.phone) {
            updateQuery += `doctor_phone = $${valueIndex}, `;
            updateValues.push(changeInforDto.phone);
            valueIndex++;
        }

        if (changeInforDto.password) {
            const hashedPassword = await bcrypt.hash(changeInforDto.password, 10);
            updateQuery += `doctor_password = $${valueIndex}, `;
            updateValues.push(hashedPassword);
            valueIndex++;
        }

        if (changeInforDto.departmentId) {
            updateQuery += `department_id = $${valueIndex}, `;
            updateValues.push(changeInforDto.departmentId);
            valueIndex++;
        }

        updateQuery = updateQuery.slice(0, -2);

        updateQuery += ` WHERE doctor_id = $${valueIndex}`;
        updateValues.push(doctorId);

        await this.dataSource.query(updateQuery, updateValues);
        return { "message": 'Doctor updated successfully' };
    }
}