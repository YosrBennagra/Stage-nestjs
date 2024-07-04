import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Answer } from 'src/Schema/Answer.Schema';
import { Question } from 'src/Schema/Question.Schema';
import { Result } from 'src/Schema/Result.Schema';

@Injectable()
export class ResultService {
    constructor(
        @InjectModel(Result.name) private resultModel: Model<Result>,
        @InjectModel(Answer.name) private answerModel: Model<Answer>,
        @InjectModel(Question.name) private questionModel: Model<Question>,

    ) { }

    async create(createResultDto: any): Promise<Result> {
        const createdResult = new this.resultModel(createResultDto);
        return createdResult.save();
    }

    async findAll(): Promise<Result[]> {
        return this.resultModel.find().exec();
    }

    async findOne(id: string): Promise<Result> {
        const result = await this.resultModel.findById(id).exec();
        if (!result) {
            throw new NotFoundException(`Result #${id} not found`);
        }
        return result;
    }

    async update(id: string, updateResultDto: any): Promise<Result> {
        const updatedResult = await this.resultModel.findByIdAndUpdate(id, updateResultDto, { new: true }).exec();
        if (!updatedResult) {
            throw new NotFoundException(`Result #${id} not found`);
        }
        return updatedResult;
    }

    async remove(id: string): Promise<Result> {
        const deletedResult = await this.resultModel.findByIdAndDelete(id).exec();
        if (!deletedResult) {
            throw new NotFoundException(`Result #${id} not found`);
        }
        return deletedResult;
    }

    async calculateAndSaveResults(studentId: string): Promise<Result[]> {
        console.log("🚀 ~ file: result.service.ts:80 ~ ResultService ~ calculateAndSaveResults ~ studentId:", studentId);
        try {
            const results = await this.answerModel.aggregate([
                {
                  $match: {
                    studentId: new mongoose.Types.ObjectId("6671bc926e9424140ed74951") 
                  }
                },
                {
                  $group: {
                    _id: '$assignmentId',
                    totalScore: { $sum: '$score' }
                  }
                }
              ]).exec();

          if (results.length === 0) {
            console.warn(`No results found for student ID: ${studentId}`);
            return [];
          }
          const savedResults = await Promise.all(results.map(async (result) => {
            const existingResult = await this.resultModel.findOne({
              assignmentId: result._id,
              studentId: studentId
            });

            if (existingResult) {
              existingResult.score = result.totalScore;
              return existingResult.save();
            } else {
              const newResult = new this.resultModel({
                assignmentId: result._id,
                studentId: studentId,
                score: result.totalScore,
              });
              return newResult.save();
            }
          }));

          console.log("🚀 ~ file: result.service.ts:80 ~ ResultService ~ calculateAndSaveResults ~ savedResults:", savedResults);
          return savedResults;
        } catch (error) {
          console.error("Error in calculateAndSaveResults:", error);
          throw new Error("Failed to calculate and save results");
        }
      }

      async getResultByStudentAndAssignment(studentId: string, assignmentId: string): Promise<Result> {
        const result = await this.resultModel.findOne({ studentId, assignmentId }).exec();
        if (!result) {
            throw new NotFoundException(`Result for student ID ${studentId} and assignment ID ${assignmentId} not found`);
        }
        return result;
    }

}
