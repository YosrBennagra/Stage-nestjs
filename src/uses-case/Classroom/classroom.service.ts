import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Classroom } from 'src/Schema/Classroom.Schema';

@Injectable()
export class ClassroomService {
  constructor(@InjectModel(Classroom.name) private classroomModel: Model<Classroom>) { }

  async create(createClassroomDto: any): Promise<Classroom> {
    const createdclassroom = new this.classroomModel(createClassroomDto);
    return createdclassroom.save();
  }


  async findAll(): Promise<Classroom[]> {
    return this.classroomModel.find().populate('groups').populate({
      path: 'groups',
      populate: { path: 'subject' }
    }).exec();
  }

  async findOne(id: string): Promise<Classroom> {
    return this.classroomModel.findById(id).populate({
      path: 'groups',
      populate: { path: 'subject' }
    }).exec();
  }

  async update(id: string, updateClassroomDto: any): Promise<Classroom> {
    return this.classroomModel.findByIdAndUpdate(id, updateClassroomDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Classroom> {
    return this.classroomModel.findByIdAndDelete(id).exec();
  }


}
