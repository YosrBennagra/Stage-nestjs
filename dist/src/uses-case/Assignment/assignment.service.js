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
exports.AssignmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Assignment_Schema_1 = require("../../Schema/Assignment.Schema");
let AssignmentService = class AssignmentService {
    constructor(assignmentModel) {
        this.assignmentModel = assignmentModel;
    }
    async create(createAssignmentDto) {
        const createAtdate = new Date();
        const createdAssignment = new this.assignmentModel({ ...createAssignmentDto, createAtdate });
        return createdAssignment.save();
    }
    async findAll() {
        return this.assignmentModel.find().exec();
    }
    async findOne(id) {
        const assignment = await this.assignmentModel.findById(id).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment #${id} not found`);
        }
        return assignment;
    }
    async update(id, updateAssignmentDto) {
        const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(id, updateAssignmentDto, { new: true }).exec();
        if (!updatedAssignment) {
            throw new common_1.NotFoundException(`Assignment #${id} not found`);
        }
        return updatedAssignment;
    }
    async remove(id) {
        const deletedAssignment = await this.assignmentModel.findByIdAndDelete(id).exec();
        if (!deletedAssignment) {
            throw new common_1.NotFoundException(`Assignment #${id} not found`);
        }
        return deletedAssignment;
    }
    async addAssignedTo(id, userId) {
        const assignment = await this.assignmentModel.findById(id).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment #${id} not found`);
        }
        if (assignment.assignedTo.includes(userId)) {
            return assignment;
        }
        assignment.assignedTo.push(userId);
        return assignment.save();
    }
};
exports.AssignmentService = AssignmentService;
exports.AssignmentService = AssignmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Assignment_Schema_1.Assignment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AssignmentService);
//# sourceMappingURL=assignment.service.js.map