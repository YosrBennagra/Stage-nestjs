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
    @Put(':assignmentId/addUser/:id')
    async addUser(@Param('assignmentId') assignmentId: string, @Param('id') id: string): Promise<Assignment> {
        try {
            return await this.assignmentService.addUser(assignmentId, id);
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }

    @Public()
    @Put(':assignmentId/removeUser/:id')
    async removeUser(@Param('assignmentId') assignmentId: string, @Param('id') id: string): Promise<Assignment> {
        try {
            return await this.assignmentService.removeUser(assignmentId, id);
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }

    @Public()
    @Put(':assignmentId/addGroup/:id')
    async addGroup(@Param('assignmentId') assignmentId: string, @Param('id') id: string): Promise<Assignment> {
        try {
            return await this.assignmentService.addGroup(assignmentId, id);
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }

    @Public()
    @Put(':assignmentId/removeGroup/:id')
    async removeGroup(@Param('assignmentId') assignmentId: string, @Param('id') id: string): Promise<Assignment> {
        try {
            return await this.assignmentService.removeGroup(assignmentId, id);
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }
    
    @Public()
    @Put('/:assignmentId/updateAssignedUsers')
    async updateAssignedUsers(
        @Param('assignmentId') assignmentId: string,
        @Body() userIdsToAdd: string[]
    ): Promise<any> {
        try {
            const updatedAssignment = await this.assignmentService.updateAssignedUsers(assignmentId, userIdsToAdd);
            return updatedAssignment;
        } catch (error) {
            throw new Error(`Failed to update assigned users for assignment ${assignmentId}: ${error.message}`);
        }
    }
    
    @Public()
    @Put('/:assignmentId/updateAssignedGroups')
    async updateAssignedGroups(
        @Param('assignmentId') assignmentId: string,
        @Body() groupIdsToAdd: string[]
    ): Promise<any> {
        try {
            const updatedAssignment = await this.assignmentService.updateAssignedGroups(assignmentId, groupIdsToAdd);
            return updatedAssignment;
        } catch (error) {
            throw new Error(`Failed to update assigned groups for assignment ${assignmentId}: ${error.message}`);
        }
    }
    
}
