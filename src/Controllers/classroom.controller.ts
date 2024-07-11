import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { Classroom } from 'src/Schema/Classroom.Schema';
import { ClassroomService } from 'src/uses-case/Classroom/classroom.service';


@Controller('classrooms')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) { }
  @Public()
  @Post()
  async create(@Body() createClassroomDto: any): Promise<Classroom> {
    return this.classroomService.create(createClassroomDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<Classroom[]> {
    return this.classroomService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Classroom> {
    return this.classroomService.findOne(id);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClassroomDto: any): Promise<Classroom> {
    return this.classroomService.update(id, updateClassroomDto);
  }

  @Public()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Classroom> {
    return this.classroomService.delete(id);
  }


}
