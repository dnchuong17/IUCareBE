import {Body, Controller, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {AppointmentService} from "../service/appointment.service";
import {AppointmentDto} from "../dto/appointment.dto";

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {
    }

    @Get()
    getAllAppointment() {
        return this.appointmentService.getAllAppointments();
    }

    @Get('check')
    getAppointmentByDate(@Query('date') date: string) {
        const dateObj = new Date(date);
        return this.appointmentService.getAppointmentsByDate(dateObj);
    }

    @Post('create_appointment')
    createAppointment(@Body() appointmentDto: AppointmentDto) {
        return this.appointmentService.createAppointment(appointmentDto);
    }

    @Patch('edit/id')
    fixAppointmentTime(@Body() appointmentDto: AppointmentDto,@Param() id: number) {
        return this.appointmentService.fixAppointment(appointmentDto, id);
    }

    @Patch('updateStatus/id')
    updateStatus(@Body() appointmentDto: AppointmentDto,@Param('id') id: number) {
        return this.appointmentService.updateAppointmentStatus(appointmentDto, id);
    }
}