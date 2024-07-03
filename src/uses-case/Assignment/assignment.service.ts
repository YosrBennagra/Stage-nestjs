
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format } from 'date-fns';
import { Model } from 'mongoose';
import { Assignment } from 'src/Schema/Assignment.Schema';
import { TypeStatus } from 'src/Schema/Enum/TypeStatus';


@Injectable()
export class AssignmentService {
  constructor(@InjectModel(Assignment.name) private assignmentModel: Model<Assignment>) { }

  async create(createAssignmentDto: any): Promise<Assignment> {
    const createAtdate = new Date();
    const formattedDate = format(createAtdate, 'yyyy-MM-dd HH:mm:ss');
    const createdAssignment = new this.assignmentModel({
      ...createAssignmentDto,
      createAtdate: formattedDate,
      status: TypeStatus.PENDING,
      isScheduled: false,
      isVisible: false,
    });
    return createdAssignment.save();
  }

  async findAll(): Promise<Assignment[]> {
    return this.assignmentModel.find().exec();
  }

  async findOne(id: string): Promise<Assignment> {
    const assignment = await this.assignmentModel.findById(id).populate('assignedToUsers').populate('assignedToGroups').exec();
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



  async addUser(assignmentId: string, id: string): Promise<Assignment> {
    const assignment = await this.assignmentModel.findById(assignmentId).exec();
    if (!assignment) {
      throw new NotFoundException(`Assignment #${assignmentId} not found`);
    }
    if (assignment.assignedToUsers.includes(id)) {
      return assignment;
    }
    const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(
      assignmentId,
      { $push: { assignedToUsers: id } },
      { new: true }
    ).exec();
    return updatedAssignment;
  }



  async removeUser(assignmentId: string, id: string): Promise<Assignment> {
    const assignment = await this.assignmentModel.findById(assignmentId).exec();
    if (!assignment) {
      throw new NotFoundException(`Assignment #${assignmentId} not found`);
    }
    if (!assignment.assignedToUsers.includes(id)) {
      throw new NotFoundException(`User #${id} not assigned to this assignment`);
    }
    const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(
      assignmentId,
      { $pull: { assignedToUsers: id } },
      { new: true }
    ).exec();
    if (!updatedAssignment) {
      throw new NotFoundException(`Assignment #${assignmentId} not found after update`);
    }

    return updatedAssignment;
  }


  async addGroup(assignmentId: string, id: string): Promise<Assignment> {
    const assignment = await this.assignmentModel.findById(assignmentId).exec();
    if (!assignment) {
      throw new NotFoundException(`Assignment #${assignmentId} not found`);
    }
    if (assignment.assignedToGroups.includes(id)) {
      return assignment;
    }
    const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(
      assignmentId,
      { $push: { assignedToGroups: id } },
      { new: true }
    ).exec();
    return updatedAssignment;
  }


  async removeGroup(assignmentId: string, id: string): Promise<Assignment> {
    const assignment = await this.assignmentModel.findById(assignmentId).exec();
    if (!assignment) {
      throw new NotFoundException(`Assignment #${assignmentId} not found`);
    }
    if (!assignment.assignedToGroups.includes(id)) {
      throw new NotFoundException(`Group #${id} not assigned to this assignment`);
    }
    const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(
      assignmentId,
      { $pull: { assignedToGroups: id } },
      { new: true }
    ).exec();
    return updatedAssignment;
  }

  async updateAssignedUsers(assignmentId: string, newAssignedUsers: string[]): Promise<Assignment> {
    const assignment = await this.assignmentModel.findById(assignmentId).exec();
    if (!assignment) {
        throw new NotFoundException(`Assignment #${assignmentId} not found`);
    }

    const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(
        assignmentId,
        { $set: { assignedToUsers: newAssignedUsers } },
        { new: true }
    ).exec();

    return updatedAssignment;
}

async updateAssignedGroups(assignmentId: string, newAssignedGroups: string[]): Promise<Assignment> {
    const assignment = await this.assignmentModel.findById(assignmentId).exec();
    if (!assignment) {
        throw new NotFoundException(`Assignment #${assignmentId} not found`);
    }
    const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(
        assignmentId,
        { $set: { assignedToGroups: newAssignedGroups } },
        { new: true }
    ).exec();

    return updatedAssignment;
}

async updatePassUser(assignmentId: string, id: string): Promise<Assignment> {
  const assignment = await this.assignmentModel.findById(assignmentId).exec();
  if (!assignment) {
    throw new NotFoundException(`Assignment #${assignmentId} not found`);
  }

  const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(
    assignmentId,
    { $push: { userpassed: id } },
    { new: true }
  ).exec();
  return updatedAssignment;
}


}
