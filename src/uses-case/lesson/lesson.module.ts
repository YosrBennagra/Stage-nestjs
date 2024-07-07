import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from 'src/Schema/Lesson.Schema';
import { LessonService } from './lesson.service';
import { LessonController } from 'src/Controllers/lesson.controller';
import { FileService } from '../FileUpload/file.service';





@Module({
  imports: [MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
  ],
  providers: [LessonService,FileService],
  controllers: [LessonController],
  exports: [LessonService],
})
export class LessonModule {}
