
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment } from 'src/Schema/Assignment.Schema';
import { AssignmentDuration } from 'src/Schema/AssignmentDuration.Schema';
import { Cron, CronExpression } from '@nestjs/schedule';


@Injectable()
export class AssignmentDurationService {
  private readonly logger = new Logger(AssignmentDurationService.name);
  constructor(
    @InjectModel(AssignmentDuration.name) private assignmentDurationModel: Model<AssignmentDuration>,
    @InjectModel(Assignment.name) private readonly assignmentModel: Model<Assignment>
  ) { }

  async createAssignmentDuration(userId: string, assignmentId: string): Promise<AssignmentDuration> {
    const assignment = await this.assignmentModel.findById(assignmentId).exec();
    if (!assignment) {
      throw new Error('Assignment not found');
    }
    const existingAssignmentDuration = await this.assignmentDurationModel.findOne({
      user: userId,
      assignment: assignmentId,
    }).exec();

    if (existingAssignmentDuration) {
      return existingAssignmentDuration;
    }
    const duration = assignment.duration * 60;
    if (assignment.isDuration) {
      const newAssignmentDuration = new this.assignmentDurationModel({
        user: userId,
        assignment: assignmentId,
        duration: duration
      });
      return newAssignmentDuration.save()
    }
  }
  @Cron('* * * * * *') 
  async handleCron() {
    const assignmentsDurations = await this.assignmentDurationModel.find().exec();

    for (const assignmentDuration of assignmentsDurations) {
      if (assignmentDuration.duration > 0) {
        assignmentDuration.duration -= 1;
        await assignmentDuration.save();
        this.logger.log(`Decremented duration for ${assignmentDuration._id}, new duration: ${assignmentDuration.duration} seconds`);

        if (assignmentDuration.duration === 0) {
          this.logger.log(`Duration expired for ${assignmentDuration._id}`);
        }
      }
    }
  }
  async findAll(): Promise<AssignmentDuration[]> {
    return this.assignmentDurationModel.find().exec();
  }

  async findOne(id: string): Promise<AssignmentDuration> {
    const assignmentDuration = await this.assignmentDurationModel.findById(id).exec();
    if (!assignmentDuration) {
      throw new NotFoundException(`AssignmentDuration with ID "${id}" not found`);
    }
    return assignmentDuration;
  }

  async update(id: string, duration: number): Promise<AssignmentDuration> {
    const updatedAssignmentDuration = await this.assignmentDurationModel.findByIdAndUpdate(id, { duration }, { new: true }).exec();
    if (!updatedAssignmentDuration) {
      throw new NotFoundException(`AssignmentDuration with ID "${id}" not found`);
    }
    return updatedAssignmentDuration;
  }

  async remove(id: string): Promise<AssignmentDuration> {
    const assignmentDuration = await this.assignmentDurationModel.findByIdAndDelete(id).exec();
    if (!assignmentDuration) {
      throw new NotFoundException(`AssignmentDuration with ID "${id}" not found`);
    }
    return assignmentDuration;
  }
  async getRemainingDuration(assignmentId: string, userId: string): Promise<{ remainingDuration: number }> {
    const assignmentDuration = await this.assignmentDurationModel.findOne({
      assignment: assignmentId,
      user: userId,
    }).exec();

    if (!assignmentDuration) {
      throw new NotFoundException(`AssignmentDuration record not found for user "${userId}" and assignment "${assignmentId}"`);
    }

    // Return the remaining duration in seconds
    return { remainingDuration: assignmentDuration.duration };
  }
}
