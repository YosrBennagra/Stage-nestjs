import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { Schedules } from 'src/Schema/Schedules.Schema';
import { SchedulesService } from 'src/uses-case/Schedule/schedules.service';

@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) { }

    @Public()
    @Get(':classId')
    async getSchedule(@Param('classId') classId: string) {
        return this.schedulesService.getSchedule(classId);
    }

    @Public()
    @Get()
    async findAll(): Promise<Schedules[]> {
        return this.schedulesService.findAll();
    }


    @Public()
    @Post(':classId')
    async createSchedule(@Param('classId') classId: string, @Body() createScheduleDto: any) {
        return this.schedulesService.createSchedule(classId, createScheduleDto);
    }
}
