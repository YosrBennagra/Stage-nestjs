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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Answer_Schema_1 = require("../../Schema/Answer.Schema");
let AnswerService = class AnswerService {
    constructor(answerModel) {
        this.answerModel = answerModel;
    }
    async create(createAnswerDto) {
        const createdAnswer = new this.answerModel(createAnswerDto);
        return createdAnswer.save();
    }
    async findAll() {
        return this.answerModel.find().exec();
    }
    async findOne(id) {
        const Answer = await this.answerModel.findById(id).exec();
        if (!Answer) {
            throw new common_1.NotFoundException(`Answer #${id} not found`);
        }
        return Answer;
    }
    async update(id, studentId, updateAnswerDto) {
        const updatedAnswer = await this.answerModel.findOneAndUpdate({ _id: id, studentId: studentId }, updateAnswerDto, { new: true, upsert: true }).exec();
        if (!updatedAnswer) {
            throw new common_1.NotFoundException(`Answer #${id} for student #${studentId} not found`);
        }
        return updatedAnswer;
    }
    async remove(id) {
        const deletedAnswer = await this.answerModel.findByIdAndDelete(id).exec();
        if (!deletedAnswer) {
            throw new common_1.NotFoundException(`Answer #${id} not found`);
        }
        return deletedAnswer;
    }
};
exports.AnswerService = AnswerService;
exports.AnswerService = AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Answer_Schema_1.Answer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnswerService);
//# sourceMappingURL=answer.service.js.map