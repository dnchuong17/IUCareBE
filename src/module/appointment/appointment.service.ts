import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AppointmentEntity} from "../entities/appointment.entity";
import {DataSource, Repository} from "typeorm";
import {AppointmentDto} from "../dto/appointment.dto";
import {DateUtils} from "../../common/utils/date.utils";

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(AppointmentEntity) private readonly appointmentRepository: Repository<AppointmentEntity>,
        private readonly dataSource: DataSource,
        private readonly dateUtils: DateUtils) {
    }

    async getAllAppointment() {
        const appointmentDto = new AppointmentDto();
        const query = 'SELECT * FROM appointment';
        return await this.appointmentRepository.query(query)
    }

    async getAppointmentByDate(date: Date) {
        const dateISO = this.dateUtils.formatDate(date);
        const query = 'SELECT * FROM appointment where time = $1';
        return this.dataSource.query(query,[dateISO]);
    }

    async findAppointment(date: Date) {
        const dateISO = this.dateUtils.formatDate(date);
        const query = 'SELECT time from appointment where time = $1';
        const existedApResult = await this.dataSource.query(query,[dateISO])
        return existedApResult.length > 0;
    }

    async createAppointment (appointmentDto: AppointmentDto) {
        const appointmentTime = this.dateUtils.formatStringToDate(appointmentDto.time);
        const existedAppointment = await this.findAppointment(appointmentTime);
        if (existedAppointment) {
            return "Please select a different time slot!"
        }
        try {
            const newAppointment = await this.appointmentRepository.create({...appointmentDto, time: appointmentTime} )
            await this.appointmentRepository.save(newAppointment);
            return 'Create appointment successfully'
        }
        catch (error) {
            throw new BadRequestException(error);
        }
    }

    async fixAppointment (appointmentDto: AppointmentDto, id: number) {
        try {
            await this.appointmentRepository.createQueryBuilder()
                .update(AppointmentEntity)
                .set({
                    time: appointmentDto.time
                })
                .where('id = :id', {id})
                .execute()
            return {
                message: 'update time successfully',
            }
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateStatus(appointmentDto: AppointmentDto, id: number) {
        try {
            await this.appointmentRepository.createQueryBuilder()
                .update(AppointmentEntity)
                .set({
                    status: appointmentDto.status
                })
                .where('id = :id', {id})
                .execute()
            return {
                message: 'update time successfully',
            }
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

}