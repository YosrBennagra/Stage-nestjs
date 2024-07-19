import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeSlot } from 'src/Schema/TimeSlot.Schema';


@Injectable()
export class TimeSlotService {
  constructor(
    @InjectModel(TimeSlot.name) private readonly timeSlotModel: Model<TimeSlot>,
  ) {}

  async createTimeSlot(day: string, time: string, classId: string): Promise<TimeSlot> {
    const newTimeSlot = new this.timeSlotModel({ day, time, classId });
    return newTimeSlot.save();
  }

  async getTimeSlotsByClassId(classId: string): Promise<TimeSlot[]> {
    return this.timeSlotModel.find({ classId }).exec();
  }

  async deleteTimeSlot(id: string): Promise<TimeSlot> {
    return this.timeSlotModel.findByIdAndDelete(id).exec();
  }
}
