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
exports.SubjectService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Subject_Schema_1 = require("../../Schema/Subject.Schema");
let SubjectService = class SubjectService {
    constructor(subjectModel) {
        this.subjectModel = subjectModel;
    }
    async create(createSubjectDto) {
        const createdSubject = new this.subjectModel({
            ...createSubjectDto,
        });
        return createdSubject.save();
    }
    async findAll() {
        return this.subjectModel.find().exec();
    }
    async findOne(id) {
        return (await this.subjectModel.findById(id).exec());
    }
    async update(id, updateSubjectDto) {
        return this.subjectModel.findByIdAndUpdate(id, updateSubjectDto, { new: true }).exec();
    }
    async delete(id) {
        return this.subjectModel.findByIdAndDelete(id).exec();
    }
};
exports.SubjectService = SubjectService;
exports.SubjectService = SubjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Subject_Schema_1.Subject.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SubjectService);
//# sourceMappingURL=subject.service.js.map