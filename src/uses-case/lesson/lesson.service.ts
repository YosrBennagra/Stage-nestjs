import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from 'src/Schema/Lesson.Schema';
import { FileService } from '../FileUpload/file.service';
import { FileUploadDto } from '../FileUpload/model/FileUploadDto';

@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson.name) private lessonModel: Model<Lesson>, private fileService: FileService) { }

  async createLesson(createLessonDto: any, files: Express.Multer.File[]): Promise<Lesson> {
    const fileDocs: FileUploadDto[] = await Promise.all(files.map(file => this.fileService.uploadFile(file)));
    const createdLesson = new this.lessonModel({
      ...createLessonDto,
      files: fileDocs.map(file => file.id),
    });
    return createdLesson.save();
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonModel.find();
  }

  async findOne(id: string): Promise<Lesson> {
    return this.lessonModel.findById(id);
  }

  async update(id: string, updateLessonDto: any): Promise<Lesson> {
    return this.lessonModel.findByIdAndUpdate(id, updateLessonDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Lesson> {
    return this.lessonModel.findByIdAndDelete(id).exec();
  }

  async findByGroupId(groupId: string): Promise<Lesson[]> {
    return this.lessonModel.find({ group: groupId }).exec();
  }
}
