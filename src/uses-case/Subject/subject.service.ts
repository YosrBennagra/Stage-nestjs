import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Institution } from 'src/Schema/Institution.Schema';
import { Subject } from 'src/Schema/Subject.Schema';


@Injectable()
export class SubjectService {
  constructor(@InjectModel(Subject.name) private subjectModel: Model<Subject>) { }

  async create(createSubjectDto: any): Promise<Subject> {
    const createdSubject = new this.subjectModel({
      ...createSubjectDto,
    });

    return createdSubject.save();
  }


  async findAll(): Promise<Subject[]> {
    return this.subjectModel.find().exec();
  }

  async findOne(id: string): Promise<Subject> {
    return (await this.subjectModel.findById(id).exec());
  }

  async update(id: string, updateSubjectDto: any): Promise<Subject> {
    return this.subjectModel.findByIdAndUpdate(id, updateSubjectDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Subject> {
    return this.subjectModel.findByIdAndDelete(id).exec();
  }

  async getSubjectsByInstitution(institution: string): Promise<Subject[]> {
    const result = await this.subjectModel.find({ institution }).exec();
    if (!result || result.length === 0) {
      throw new NotFoundException(`Subject not found for ${institution}`);
    }
    return result;
  }
}
