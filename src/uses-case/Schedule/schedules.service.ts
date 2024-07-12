import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Salary } from 'src/Schema/Salary.Schema';
import { Schedules } from 'src/Schema/Schedules.Schema';
import { User } from 'src/Schema/User.Schema';


@Injectable()
export class SchedulesService {
    constructor(
        @InjectModel(Schedules.name) private scheduleModel: Model<Schedules>,
        @InjectModel(Salary.name) private salaryModel: Model<Salary>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async getSchedule(classId: string): Promise<Schedules | null> {
        return this.scheduleModel.findOne({ classId }).exec();
    }

    async createSchedule(classId: string, createScheduleDto: any): Promise<Schedules> {
        return this.scheduleModel.findOneAndUpdate({ classId }, createScheduleDto, { new: true, upsert: true }).exec();
    }

    async findAll(): Promise<Schedules[]> {
        return this.scheduleModel.find().populate('schedule').populate({ path: 'schedule', populate: { path: 'users' } }).exec();
    }

}
