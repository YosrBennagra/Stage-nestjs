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

    async findResultsByStudentId(studentId: string): Promise<any[]> {
        return this.resultModel.aggregate([
            { $match: { studentId: studentId } },
            {
                $group: {
                    _id: '$assignmentId',
                    totalScore: { $sum: '$score' },
                }
            },
            {
                $lookup: {
                    from: 'assignments',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'assignmentDetails',
                },
            },
            { $unwind: '$assignmentDetails' },
            {
                $project: {
                    assignmentId: '$_id',
                    totalScore: 1,
                    assignmentName: '$assignmentDetails.name',
                },
            }
        ]).exec();
    }

    async calculateAndSaveResults(studentId: string): Promise<Result[]> {
        const results = await this.answerModel.aggregate([
            { $match: { studentId: new mongoose.Types.ObjectId(studentId) } },
            {
                $lookup: {
                    from: 'questions',
                    localField: 'questionId',
                    foreignField: '_id',
                    as: 'questionDetails'
                }
            },
            { $unwind: '$questionDetails' },
            {
                $group: {
                    _id: '$questionDetails.assignementId',
                    totalScore: { $sum: '$score' }
                }
            }
        ]).exec();
        const savedResults = await Promise.all(results.map(async (result) => {
            const newResult = new this.resultModel({
                assignmentId: result._id,
                studentId: studentId,
                score: result.totalScore,
            });
            return newResult.save();
        }));
        return savedResults;
    }
}
