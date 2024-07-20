// assignment-duration.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { AssignmentDuration } from 'src/Schema/AssignmentDuration.Schema';
import { AssignmentDurationService } from 'src/uses-case/AssignmentDuration/AssignmentDuration.service';


@Controller('assignment-durations')
export class AssignmentDurationController {
  constructor(private readonly assignmentDurationService: AssignmentDurationService) { }
  @Public()
  @Post()
  async create(@Body() createAssignmentDurationDto: { user: string; assignment: string }) {
    const { user, assignment } = createAssignmentDurationDto;
    return this.assignmentDurationService.createAssignmentDuration(user, assignment);
  }
  @Public()
  @Get()
  async findAll(): Promise<AssignmentDuration[]> {
    return this.assignmentDurationService.findAll();
  }
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AssignmentDuration> {
    return this.assignmentDurationService.findOne(id);
  }
  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body('duration') duration: number): Promise<AssignmentDuration> {
    return this.assignmentDurationService.update(id, duration);
  }
  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<AssignmentDuration> {
    return this.assignmentDurationService.remove(id);
  }
  @Public()
  @Get(':assignmentId/:userId')
  async getRemainingDuration(
    @Param('assignmentId') assignmentId: string,
    @Param('userId') userId: string,
  ): Promise<{ remainingDuration: number }> {
    return this.assignmentDurationService.getRemainingDuration(assignmentId, userId);
  }
}
