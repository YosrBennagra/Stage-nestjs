"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Answer_Schema_1 = require("../../Schema/Answer.Schema");
const Question_Schema_1 = require("../../Schema/Question.Schema");
const Result_Schema_1 = require("../../Schema/Result.Schema");
let ResultService = class ResultService {
    constructor(resultModel, answerModel, questionModel) {
        this.resultModel = resultModel;
        this.answerModel = answerModel;
        this.questionModel = questionModel;
    }
    async create(createResultDto) {
        const createdResult = new this.resultModel(createResultDto);
        return createdResult.save();
    }
    async findAll() {
        return this.resultModel.find().exec();
    }
    async findOne(id) {
        const result = await this.resultModel.findById(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Result #${id} not found`);
        }
        return result;
    }
    async update(id, updateResultDto) {
        const updatedResult = await this.resultModel.findByIdAndUpdate(id, updateResultDto, { new: true }).exec();
        if (!updatedResult) {
            throw new common_1.NotFoundException(`Result #${id} not found`);
        }
        return updatedResult;
    }
    async remove(id) {
        const deletedResult = await this.resultModel.findByIdAndDelete(id).exec();
        if (!deletedResult) {
            throw new common_1.NotFoundException(`Result #${id} not found`);
        }
        return deletedResult;
    }
    async calculateAndSaveResults(studentId) {
        console.log("🚀 ~ file: result.service.ts:80 ~ ResultService ~ calculateAndSaveResults ~ studentId:", studentId);
        try {
            const results = await this.answerModel.aggregate([
                {
                    $match: {
                        studentId: new mongoose_2.default.Types.ObjectId("6671bc926e9424140ed74951")
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
                }
                else {
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
        }
        catch (error) {
            console.error("Error in calculateAndSaveResults:", error);
            throw new Error("Failed to calculate and save results");
        }
    }
    async getResultByStudentAndAssignment(studentId, assignmentId) {
        const result = await this.resultModel.findOne({ studentId, assignmentId }).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Result for student ID ${studentId} and assignment ID ${assignmentId} not found`);
        }
        return result;
    }
};
exports.ResultService = ResultService;
exports.ResultService = ResultService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Result_Schema_1.Result.name)),
    __param(1, (0, mongoose_1.InjectModel)(Answer_Schema_1.Answer.name)),
    __param(2, (0, mongoose_1.InjectModel)(Question_Schema_1.Question.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ResultService);
//# sourceMappingURL=result.service.js.map