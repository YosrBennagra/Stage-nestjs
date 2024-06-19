import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from 'src/Schema/Question.Schema';


@Injectable()
export class QuestionService {
  constructor(@InjectModel(Question.name) private questionModel: Model<Question>) {}

  async create(createQuestionDto: any): Promise<Question> {
    const createdQuestion = new this.questionModel(createQuestionDto);
    return createdQuestion.save();
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionModel.findById(id).exec();
    if (!question) {
      throw new NotFoundException(`Question #${id} not found`);
    }
    return question;
  }

  async update(id: string, updateQuestionDto: any): Promise<Question> {
    const updatedQuestion = await this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true }).exec();
    if (!updatedQuestion) {
      throw new NotFoundException(`Question #${id} not found`);
    }
    return updatedQuestion;
  }

  async remove(id: string): Promise<Question> {
    const deletedQuestion = await this.questionModel.findByIdAndDelete(id).exec();
    if (!deletedQuestion) {
      throw new NotFoundException(`Question #${id} not found`);
    }
    return deletedQuestion;
  }

  async findByAssignmentId(assignementId: string): Promise<Question[]> {
    return this.questionModel.find({ assignementId }).exec();
  }

  
}
