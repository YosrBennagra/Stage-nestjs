import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/Schema/Enum/Role';
import { Group } from 'src/Schema/Group.Schema';
import { User } from 'src/Schema/User.Schema';


@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>, @InjectModel(User.name) private userModel: Model<User>) { }

  async create(createGroupDto: any): Promise<Group> {
    const createdGroup = new this.groupModel({
      ...createGroupDto,
      color: getRandomHexColor(),
    });

    return createdGroup.save();
  }


  async findAll(): Promise<Group[]> {
    return this.groupModel.find().populate('users').exec();
  }

  async findOne(id: string): Promise<Group> {
    return (await this.groupModel.findById(id)).populate('users');
  }

  async update(id: string, updateGroupDto: any): Promise<Group> {
    return this.groupModel.findByIdAndUpdate(id, updateGroupDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Group> {
    return this.groupModel.findByIdAndDelete(id).exec();
  }

  async addUser(groupId: string, id: string): Promise<Group> {
    return this.groupModel.findByIdAndUpdate(groupId, { $push: { users: id } }, { new: true }).exec();
  }


  async removeUser(groupId: string, id: string): Promise<Group> {
    return this.groupModel.findByIdAndUpdate(groupId, { $pull: { users: id } }, { new: true }).exec();
  }



}
function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  console.log(color);
  return color;
}