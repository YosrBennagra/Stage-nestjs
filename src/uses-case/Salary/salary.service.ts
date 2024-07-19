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
        @InjectModel(Salary.name) private readonly salaryModel: Model<Salary>,

    ) { }

    async getSalary(): Promise<Salary[]> {
        return this.salaryModel.find().exec();
    }

    async createOrUpdateSalary(teacherId: string, updates: Partial<Salary>): Promise<Salary> {
        let salary = await this.salaryModel.findOne({ TeacherId: teacherId });

        if (!salary) {
            salary = new this.salaryModel({ TeacherId: teacherId, ...updates });
        } else {
            Object.assign(salary, updates);
        }
        if (salary.salaryType) {
            salary.salary = (salary.hours ?? 0) * (salary.salaryPerHour ?? 0);
        } else {
            salary.salary = updates.salary ?? salary.salary;
        }
        await salary.save();
        return salary;
    }

    async updateSalary(teacherId: string, updates: Partial<Salary>): Promise<Salary> {
        const salary = await this.salaryModel.findOneAndUpdate(
            { TeacherId: teacherId },
            { $set: updates },
            { new: true }
        );
        if (salary.salaryType) {
            salary.salary = (salary.hours ?? 0) * (salary.salaryPerHour ?? 0);
        } else {
            salary.salary = updates.salary ?? salary.salary;
        }

        await salary.save();
        return salary;
    }
}
