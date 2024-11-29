import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AppointmentEntity} from "../entity/appointment.entity";
import {DataSource, Repository} from "typeorm";
import {AppointmentDto} from "../dto/appointment.dto";
import {DateUtils} from "../../../common/utils/date.utils";
import {MedicalRecordService} from "../../medical_record/service/medical_record.service";
import {MedicalRecordDto} from "../../medical_record/dto/medical_record.dto";

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(AppointmentEntity) private readonly appointmentRepository: Repository<AppointmentEntity>,
        private readonly dataSource: DataSource,
        private readonly dateUtils: DateUtils,
        private readonly medicalRecordService: MedicalRecordService) {
    }

    async getAllAppointments() {
        const query = 'SELECT * FROM appointment';
        return await this.dataSource.query(query);
    }

    async getAppointmentsByDate(date: Date) {
        const dateISO = this.dateUtils.formatDate(date);
        const query = 'SELECT * FROM appointment WHERE appointment_time::DATE = $1';
        return await this.dataSource.query(query, [dateISO]);
    }

    async findAppointment(date: Date) {
        const dateISO = this.dateUtils.formatDate(date);
        const query = 'SELECT 1 FROM appointment WHERE appointment_time = $1';
        const result = await this.dataSource.query(query, [dateISO]);
        return result.length > 0;
    }

    async createAppointment(appointmentDto: AppointmentDto) {
        const appointmentTime = this.dateUtils.formatStringToDate(appointmentDto.time);
        const existedAppointment = await this.findAppointment(appointmentTime);
        if (existedAppointment) {
            return "Please select a different time slot!";
        }

        const query = `
        INSERT INTO appointment (appointment_time, "doctorId", "patientId")
        VALUES ($1, $2, $3) RETURNING appointment_id
    `;
        const result = await this.dataSource.query(query, [
            appointmentTime,
            appointmentDto.doctorId,
            appointmentDto.patientId,
        ]);
        const recordDto = new MedicalRecordDto();
        recordDto.patientId = appointmentDto.patientId;
        recordDto.doctorId = appointmentDto.doctorId;
        recordDto.date = appointmentTime;

        await this.medicalRecordService.firstRecord(recordDto);

        return {
            message: 'Appointment created successfully',
            appointmentId: result[0].appointment_id,
        };
    }

    async fixAppointment(appointmentDto: AppointmentDto, id: number) {
        const appointmentTime = this.dateUtils.formatStringToDate(appointmentDto.time);
        const dateISO = appointmentTime.toISOString();
        const query = `
        UPDATE appointment
        SET appointment_time = $1
        WHERE appointment_id = $2
    `;
        await this.dataSource.query(query, [dateISO, id]);

        return {
            message: 'Appointment time updated successfully',
        };
    }

    async updateAppointmentStatus(appointmentDto: AppointmentDto, id: number) {
        const query = `
        UPDATE appointment
        SET appointment_status = $1
        WHERE appointment_id = $2
    `;
        await this.dataSource.query(query, [appointmentDto.status, id]);

        return {
            message: 'Appointment status updated successfully',
        };
    }
    async getAppointmentTime(appointmentId: number) {
        const query = 'SELECT appointment.appointment_time FROM appointment WHERE appointment_id = $1';
        const time = await this.dataSource.query(query, [appointmentId]);
        return time[0].appointment_time;
    }
}