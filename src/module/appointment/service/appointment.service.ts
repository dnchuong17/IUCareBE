import {Injectable} from "@nestjs/common";
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
        const query = `
        SELECT 
            appointment.appointment_id,
            appointment.appointment_time, 
            appointment.appointment_status,
            appointment."doctorId",
            appointment."patientId",
            patient.patient_name, 
            patient.student_id 
        FROM appointment 
        LEFT JOIN patient ON appointment."patientId" = patient.patient_id
        WHERE DATE(appointment.appointment_time) = $1
    `;
        const appointment = await this.dataSource.query(query, [dateISO]);
        return appointment.length > 0 ? appointment : [];
    }

    async existAppointment(date: Date, doctorId: number, patientId: number) {
        const query = `
        SELECT 1 FROM appointment
        WHERE appointment_time = $1
        AND "doctorId" = $2
        AND "patientId" = $3
    `;
        const result = await this.dataSource.query(query, [date, doctorId, patientId]);
        return result.length > 0;
    }

    async createAppointment(appointmentDto: AppointmentDto) {
        const checkExistedAppointment = await this.existAppointment( appointmentDto.time, appointmentDto.doctorId, appointmentDto.patientId);
        if (checkExistedAppointment) {
            return { message: "Please select a different time slot!" };
        }

        const query = `
        INSERT INTO appointment (appointment_time, "doctorId", "patientId", appointment_status)
        VALUES ($1, $2, $3, $4) RETURNING appointment_id
    `;
        const result = await this.dataSource.query(query, [
            appointmentDto.time,
            appointmentDto.doctorId,
            appointmentDto.patientId,
            appointmentDto.status || 'APPROVED',
        ]);

        const recordDto = new MedicalRecordDto();
        recordDto.patientId = appointmentDto.patientId;
        recordDto.doctorId = appointmentDto.doctorId;
        recordDto.date = appointmentDto.time;
        recordDto.appointmentId = result[0].appointment_id;

        await this.medicalRecordService.firstRecord(recordDto);

        return {
            message: 'Appointment created successfully',
            appointmentId: result[0].appointment_id,
        };
    }


    async fixAppointment(appointmentDto: AppointmentDto, id: number) {
        const query = `
        UPDATE appointment
        SET appointment_time = $1
        WHERE appointment_id = $2
    `;
        await this.dataSource.query(query, [appointmentDto.time, id]);

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
}