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
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Lesson_Schema_1 = require("../../Schema/Lesson.Schema");
const file_service_1 = require("../FileUpload/file.service");
let LessonService = class LessonService {
    constructor(lessonModel, fileService) {
        this.lessonModel = lessonModel;
        this.fileService = fileService;
    }
    async createLesson(createLessonDto, files) {
        const fileDocs = await Promise.all(files.map(file => this.fileService.uploadFile(file)));
        const createdLesson = new this.lessonModel({
            ...createLessonDto,
            files: fileDocs.map(file => file.id),
        });
        return createdLesson.save();
    }
    async findAll() {
        return this.lessonModel.find();
    }
    async findOne(id) {
        return this.lessonModel.findById(id);
    }
    async update(id, updateLessonDto) {
        return this.lessonModel.findByIdAndUpdate(id, updateLessonDto, { new: true }).exec();
    }
    async delete(id) {
        return this.lessonModel.findByIdAndDelete(id).exec();
    }
    async findByGroupId(groupId) {
        return this.lessonModel.find({ group: groupId }).exec();
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Lesson_Schema_1.Lesson.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, file_service_1.FileService])
], LessonService);
//# sourceMappingURL=lesson.service.js.map