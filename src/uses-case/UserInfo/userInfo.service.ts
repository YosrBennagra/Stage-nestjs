import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo } from 'src/Schema/UserInfo.Schema';

@Injectable()
export class UserInfoService {
  constructor(@InjectModel(UserInfo.name) private UserInfoModel: Model<UserInfo>) { }

  async createUserInfo(createUserInfoDto: any): Promise<UserInfo> {
    const createUserInfoDtoo = new this.UserInfoModel({
      ...createUserInfoDto,

  });
    return createUserInfoDtoo.save();
  }

  async findAll(): Promise<UserInfo[]> {
    return this.UserInfoModel.find();
  }

  async findOne(id: string): Promise<UserInfo> {
    return this.UserInfoModel.findById(id);
  }

  async update(id: string, updateUserInfoDto: any): Promise<UserInfo> {
    return this.UserInfoModel.findByIdAndUpdate(id, updateUserInfoDto, { new: true }).exec();
  }

  async delete(id: string): Promise<UserInfo> {
    return this.UserInfoModel.findByIdAndDelete(id).exec();
  }

  async findByGroupId(groupId: string): Promise<UserInfo> {
    return this.UserInfoModel.findOne({ user: groupId }).exec();
  }

  async findByIns(groupId: string): Promise<UserInfo[]> {
    return this.UserInfoModel.find({ institution: groupId }).populate('user').exec();
  }
}
