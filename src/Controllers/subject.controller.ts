import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { Institution } from 'src/Schema/Institution.Schema';
import { Subject } from 'src/Schema/Subject.Schema';

import { SubjectService } from 'src/uses-case/Subject/subject.service';



@Controller('subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) { }
    @Public()
    @Post()
    async create(@Body() createSubjectDto: any): Promise<Subject> {
        return this.subjectService.create(createSubjectDto);
    }

    @Public()
    @Get()
    async findAll(): Promise<Subject[]> {
        return this.subjectService.findAll();
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Subject> {
        return this.subjectService.findOne(id);
    }

    @Public()
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateSubjectDto: any): Promise<Subject> {
        return this.subjectService.update(id, updateSubjectDto);
    }

    @Public()
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Subject> {
        return this.subjectService.delete(id);
    }


}
