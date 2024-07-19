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
        return this.scheduleModel.find().populate('schedule').exec();
    }
    async getScheduleByClassId(classId: string): Promise<Schedules[]> {
        return this.scheduleModel.find({ classId }).populate('subject').populate('teacher').exec();
    }
    async createOrUpdateSchedule(classId: string, scheduleData: any): Promise<Schedules[]> {
        await this.scheduleModel.deleteMany({ classId }).exec();
        const schedules = scheduleData.map((entry) => ({
            classId,
            subject: entry.subject,
            teacher: entry.teacher,
            day: entry.day,
            time: entry.time,
        }));

        await this.scheduleModel.insertMany(schedules);
        return this.scheduleModel.find({ classId }).populate('subject').populate('teacher').exec();
    }


    async removeScheduleEntry(scheduleId: string): Promise<void> {
        await this.scheduleModel.findByIdAndDelete(scheduleId).exec();
    }
}
