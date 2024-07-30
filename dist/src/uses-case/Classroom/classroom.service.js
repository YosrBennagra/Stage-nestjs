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
exports.ClassroomService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Classroom_Schema_1 = require("../../Schema/Classroom.Schema");
let ClassroomService = class ClassroomService {
    constructor(classroomModel) {
        this.classroomModel = classroomModel;
    }
    async create(createClassroomDto) {
        const createdclassroom = new this.classroomModel(createClassroomDto);
        return createdclassroom.save();
    }
    async findAll(page, limit, search) {
        page = Math.max(1, page);
        limit = Math.max(1, limit);
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};
        const skip = (page - 1) * limit;
        const classrooms = await this.classroomModel.find(query)
            .populate('groups')
            .populate({ path: 'groups', populate: { path: 'subject' } })
            .skip(skip)
            .limit(limit)
            .exec();
        const total = await this.classroomModel.countDocuments(query).exec();
        return { classrooms, total };
    }
    async findOne(id) {
        return this.classroomModel.findById(id).populate({
            path: 'groups',
            populate: { path: 'subject' }
        }).exec();
    }
    async update(id, updateClassroomDto) {
        return this.classroomModel.findByIdAndUpdate(id, updateClassroomDto, { new: true }).exec();
    }
    async delete(id) {
        return this.classroomModel.findByIdAndDelete(id).exec();
    }
};
exports.ClassroomService = ClassroomService;
exports.ClassroomService = ClassroomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Classroom_Schema_1.Classroom.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClassroomService);
//# sourceMappingURL=classroom.service.js.map