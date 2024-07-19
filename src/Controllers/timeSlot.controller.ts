import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { TimeSlotService } from 'src/uses-case/TimeSlot/timeSlot.service';


@Controller('timeslots')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}
  @Public()
  @Post()
  async createTimeSlot(@Body('day') day: string, @Body('time') time: string, @Body('classId') classId: string) {
    return this.timeSlotService.createTimeSlot(day, time, classId);
  }
  @Public()
  @Get(':classId')
  async getTimeSlotsByClassId(@Param('classId') classId: string) {
    return this.timeSlotService.getTimeSlotsByClassId(classId);
  }
  @Public()
  @Delete(':id')
  async deleteTimeSlot(@Param('id') id: string) {
    return this.timeSlotService.deleteTimeSlot(id);
  }
}
