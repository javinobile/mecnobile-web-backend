import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment/appointment';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() appointmentData: Partial<Appointment>): Promise<Appointment> {
        return this.appointmentsService.create(appointmentData);
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll(): Promise<Appointment[]> {
        return this.appointmentsService.findAll();
    }
}
