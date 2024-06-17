import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from 'src/Schema/Answer.Schema';



@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer.name) private answerModel: Model<Answer>) {}

  async create(createAnswerDto: any): Promise<Answer> {
    const createdAnswer = new this.answerModel(createAnswerDto);
    return createdAnswer.save();
  }

  async findAll(): Promise<Answer[]> {
    return this.answerModel.find().exec();
  }

  async findOne(id: string): Promise<Answer> {
    const Answer = await this.answerModel.findById(id).exec();
    if (!Answer) {
      throw new NotFoundException(`Answer #${id} not found`);
    }
    return Answer;
  }

  async update(id: string, updateAnswerDto: any): Promise<Answer> {
    const updatedAnswer = await this.answerModel.findByIdAndUpdate(id, updateAnswerDto, { new: true }).exec();
    if (!updatedAnswer) {
      throw new NotFoundException(`Answer #${id} not found`);
    }
    return updatedAnswer;
  }

  async remove(id: string): Promise<Answer> {
    const deletedAnswer = await this.answerModel.findByIdAndDelete(id).exec();
    if (!deletedAnswer) {
      throw new NotFoundException(`Answer #${id} not found`);
    }
    return deletedAnswer;
  }


}
