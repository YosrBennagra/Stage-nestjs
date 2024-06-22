import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { User,  } from 'src/Schema/User.Schema';
import { UserRepositoryInterface } from "./user.repository.interface";


@Injectable()
export class UserRepository extends BaseAbstractRepository<User> implements UserRepositoryInterface {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  async findUserWithNumber(usernameWithNumber: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username: usernameWithNumber });
    return !!user;
  }

  async findUnconfirmedUsers(): Promise<User[]> {
    return await this.find({ where: { isEmailConfirmed: false } });
  }

  async findAll(params?: object): Promise<User[]> {
    return this.userModel.find(params).exec();
  }

  async findByRole(role: string, search: string, limit: number, offset: number): Promise<{ users: User[], count: number }> {
    const query = this.userModel.find({ Role: role });

    if (search) {
      query.or([
        { username: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ]);
    }

    const users = await query.skip(offset).limit(limit).exec();
    const count = await this.userModel.countDocuments(query.getQuery());

    return { users, count };
  }

}

