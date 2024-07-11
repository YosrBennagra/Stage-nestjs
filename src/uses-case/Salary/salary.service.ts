import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Role } from 'src/Schema/Enum/Role';
import { Salary } from 'src/Schema/Salary.Schema';
import { User } from 'src/Schema/User.Schema';
import { SchedulesService } from '../Schedule/schedules.service';
import { Group } from 'src/Schema/Group.Schema';
import { Schedules } from 'src/Schema/Schedules.Schema';


@Injectable()
export class SalaryService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Salary.name) private readonly salaryModel: Model<Salary>,
        @InjectModel(Group.name) private readonly groupModel: Model<Group>,
        @InjectModel(Schedules.name) private readonly schedulesModel: Model<Salary>
    ) { }


    async calculateTeacherHours(teacherId: string): Promise<number> {
        const teacherObjectId = new mongoose.Types.ObjectId(teacherId);

        const aggregationResult = await this.schedulesModel.aggregate([
            {
                $lookup: {
                    from: 'groups',
                    localField: 'schedule',
                    foreignField: '_id',
                    as: 'groups',
                },
            },
            {
                $unwind: '$groups',
            },
            {
                $match: {
                    'groups.users': teacherObjectId,
                },
            },
            {
                $project: {
                    schedule: 1,
                    groups: 1,
                },
            },
            {
                $addFields: {
                    scheduleArray: { $objectToArray: "$schedule" },
                },
            },
            {
                $unwind: "$scheduleArray",
            },
            {
                $match: {
                    "scheduleArray.v": { $in: ["667766c0133adba1723381dd"] }
                },
            },
            {
                $group: {
                    _id: teacherObjectId,
                    totalHours: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalHours: 1,
                },
            },
        ]);

        console.log("🚀 ~ file: salary.service.ts:61 ~ SalaryService ~ calculateTeacherHours ~ aggregationResult:", aggregationResult);

        return aggregationResult[0]?.totalHours || 0;
    }

    async FillTeachers(): Promise<void> {
        try {
            const teachers = await this.userModel.find({ Role: Role.TEACHER });
            for (const teacher of teachers) {
                const existingSalary = await this.salaryModel.findOne({ TeacherId: teacher._id });

                const hours = await this.calculateTeacherHours(teacher._id.toString());

                if (existingSalary) {
                    existingSalary.hours = hours;
                    await existingSalary.save();
                } else {
                    await this.salaryModel.create({ TeacherId: teacher._id, hours });
                }
            }
        } catch (error) {
            console.error('Error filling salaries for teachers:', error);
            throw error;
        }
    }



}
