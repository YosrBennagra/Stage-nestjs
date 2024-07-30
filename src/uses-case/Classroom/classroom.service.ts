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

  async findAll(page: number, limit: number, search: string): Promise<{ classrooms: Classroom[], total: number }> {

    page = Math.max(1, page); 
    limit = Math.max(1, limit);

    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    const skip = (page - 1) * limit;
    const classrooms = await this.classroomModel.find(query)
      .populate('groups')
      .populate({ path: 'groups', populate: { path: 'subject' } })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.classroomModel.countDocuments(query).exec();

    return { classrooms, total };
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
