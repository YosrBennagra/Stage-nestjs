
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment } from 'src/Schema/Assignment.Schema';


@Injectable()
export class AssignmentService {
  constructor(@InjectModel(Assignment.name) private assignmentModel: Model<Assignment>) {}

  async create(createAssignmentDto: any): Promise<Assignment> {
    const createAtdate = new Date();
    const createdAssignment = new this.assignmentModel({...createAssignmentDto, createAtdate} );
    return createdAssignment.save();
  }

  async findAll(): Promise<Assignment[]> {
    return this.assignmentModel.find().exec();
  }

  async findOne(id: string): Promise<Assignment> {
    const assignment = await this.assignmentModel.findById(id).exec();
    if (!assignment) {
      throw new NotFoundException(`Assignment #${id} not found`);
    }
    return assignment;
  }

  async update(id: string, updateAssignmentDto: any): Promise<Assignment> {
    const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(id, updateAssignmentDto, { new: true }).exec();
    if (!updatedAssignment) {
      throw new NotFoundException(`Assignment #${id} not found`);
    }
    return updatedAssignment;
  }

  async remove(id: string): Promise<Assignment> {
    const deletedAssignment = await this.assignmentModel.findByIdAndDelete(id).exec();
    if (!deletedAssignment) {
      throw new NotFoundException(`Assignment #${id} not found`);
    }
    return deletedAssignment;
  }

  async addAssignedTo(id: string, userId: string): Promise<Assignment> {
    const assignment = await this.assignmentModel.findById(id).exec();
    if (!assignment) {
      throw new NotFoundException(`Assignment #${id} not found`);
    }
    

    if (assignment.assignedTo.includes(userId)) {
      return assignment;
    }
    
    assignment.assignedTo.push(userId);
    return assignment.save();
  }
}
