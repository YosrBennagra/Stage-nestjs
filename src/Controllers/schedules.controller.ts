import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { Schedules } from 'src/Schema/Schedules.Schema';
import { SchedulesService } from 'src/uses-case/Schedule/schedules.service';

@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) { }

    @Public()
    @Get(':classId')
    async getSchedule(@Param('classId') classId: string): Promise<Schedules[]> {
        return this.schedulesService.getScheduleByClassId(classId);
    }

    @Public()
    @Get()
    async findAll(): Promise<Schedules[]> {
        return this.schedulesService.findAll();
    }

    @Public()
    @Get(':classId')
    async getScheduleByClassId(@Param('classId') classId: string): Promise<Schedules[]> {
        return this.schedulesService.getScheduleByClassId(classId);
    }
    @Public()
    @Post(':classId')
    async createOrUpdateSchedule(@Param('classId') classId: string, @Body() scheduleData: any): Promise<Schedules[]> {
        return this.schedulesService.createOrUpdateSchedule(classId, scheduleData);
    }

    @Public()
    @Delete(':scheduleId')
    async removeScheduleEntry(@Param('scheduleId') scheduleId: string): Promise<void> {
        await this.schedulesService.removeScheduleEntry(scheduleId);
    }
}
