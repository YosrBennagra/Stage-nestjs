import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from 'src/Schema/Group.Schema';


@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  async create(createGroupDto: any): Promise<Group> {
    const createdGroup = new this.groupModel(createGroupDto);
    return createdGroup.save();
  }

  async findAll(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }

  async findOne(id: string): Promise<Group> {
    return this.groupModel.findById(id).exec();
  }

  async update(id: string, updateGroupDto: any): Promise<Group> {
    return this.groupModel.findByIdAndUpdate(id, updateGroupDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Group> {
    return this.groupModel.findByIdAndDelete(id).exec();
  }

  async addUser(groupId: string, userId: string): Promise<Group> {
    return this.groupModel.findByIdAndUpdate(groupId, { $push: { users: userId } }, { new: true }).exec();
  }
}