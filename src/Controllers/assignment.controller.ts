import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { Assignment } from 'src/Schema/Assignment.Schema';
import { AssignmentService } from 'src/uses-case/Assignment/assignment.service';


@Controller('assignments')
export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) { }

    @Public()
    @Post()
    async create(@Body() createAssignmentDto: any): Promise<Assignment> {
        return this.assignmentService.create(createAssignmentDto);
    }
    
    @Public()
    @Get()
    async findAll(): Promise<Assignment[]> {
        return this.assignmentService.findAll();
    }
    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Assignment> {
        const assignment = await this.assignmentService.findOne(id);
        if (!assignment) {
            throw new NotFoundException(`Assignment #${id} not found`);
        }
        return assignment;
    }

    @Public()
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAssignmentDto: any): Promise<Assignment> {
        const assignment = await this.assignmentService.update(id, updateAssignmentDto);
        if (!assignment) {
            throw new NotFoundException(`Assignment #${id} not found`);
        }
        return assignment;
    }
    @Public()
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Assignment> {
        const assignment = await this.assignmentService.remove(id);
        if (!assignment) {
            throw new NotFoundException(`Assignment #${id} not found`);
        }
        return assignment;
    }
    @Public()
    @Post(':id/assignedto/:userId')
    async addAssignedTo(@Param('id') id: string, @Param('userId') userId: string): Promise<any> {
      try {
        const assignment = await this.assignmentService.addAssignedTo(id, userId);
        return { message: 'User added to assignment', assignment };
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }
    }
}
