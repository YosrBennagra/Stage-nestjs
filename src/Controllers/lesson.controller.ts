import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse } from '@nestjs/swagger';
import { Public } from 'src/Custom Decorators/public.decorator';
import { Lesson } from 'src/Schema/Lesson.Schema';
import { LessonService } from 'src/uses-case/lesson/lesson.service';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Public()
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiCreatedResponse({ type: Lesson })
  async createLesson(@Body() createLessonDto: any, @UploadedFiles() files: Express.Multer.File[]): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonDto, files);
  }

  @Public()
  @Get()
  async findAll(): Promise<Lesson[]> {
    return this.lessonService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Lesson> {
    return this.lessonService.findOne(id);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLessonDto: any): Promise<Lesson> {
    return this.lessonService.update(id, updateLessonDto);
  }

  @Public()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Lesson> {
    return this.lessonService.delete(id);
  }

  @Public()
  @Get('/bygroup/:groupId')
  async findByGroupId(@Param('groupId') groupId: string): Promise<Lesson[]> {
    return this.lessonService.findByGroupId(groupId);
  }
}
