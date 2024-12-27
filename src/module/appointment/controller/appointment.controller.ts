import {Body, Controller, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {AppointmentService} from "../service/appointment.service";
import {AppointmentDto} from "../dto/appointment.dto";
import {Public} from "../../../auth/decorator/public.decorator";

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {
    }

    @Get()
    getAllAppointment() {
        return this.appointmentService.getAllAppointments();
    }

    @Get('check/:doctorId')
    getAppointmentByDate(@Query('date') date: string | Date,@Param('doctorId') doctorId: number) {
        return this.appointmentService.getAppointmentsByDate(date, doctorId);
    }

    @Post('create_appointment')
    createAppointment(@Body() appointmentDto: AppointmentDto) {
        return this.appointmentService.createAppointment(appointmentDto);
    }

    @Patch('edit/:id')
    fixAppointmentTime(@Body() appointmentDto: AppointmentDto,@Param('id') id: number) {
        return this.appointmentService.fixAppointment(appointmentDto, id);
    }

    @Patch('updateStatus/:id')
    updateStatus(@Body() appointmentDto: AppointmentDto,@Param('id') id: number) {
        return this.appointmentService.updateAppointmentStatus(appointmentDto, id);
    }
}