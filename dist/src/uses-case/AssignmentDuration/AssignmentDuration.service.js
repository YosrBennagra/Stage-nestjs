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
var AssignmentDurationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentDurationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Assignment_Schema_1 = require("../../Schema/Assignment.Schema");
const AssignmentDuration_Schema_1 = require("../../Schema/AssignmentDuration.Schema");
const schedule_1 = require("@nestjs/schedule");
let AssignmentDurationService = AssignmentDurationService_1 = class AssignmentDurationService {
    constructor(assignmentDurationModel, assignmentModel) {
        this.assignmentDurationModel = assignmentDurationModel;
        this.assignmentModel = assignmentModel;
        this.logger = new common_1.Logger(AssignmentDurationService_1.name);
    }
    async createAssignmentDuration(userId, assignmentId) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new Error('Assignment not found');
        }
        const existingAssignmentDuration = await this.assignmentDurationModel.findOne({
            user: userId,
            assignment: assignmentId,
        }).exec();
        if (existingAssignmentDuration) {
            return existingAssignmentDuration;
        }
        const duration = assignment.duration * 60;
        if (assignment.isDuration) {
            const newAssignmentDuration = new this.assignmentDurationModel({
                user: userId,
                assignment: assignmentId,
                duration: duration
            });
            return newAssignmentDuration.save();
        }
    }
    async handleCron() {
        const assignmentsDurations = await this.assignmentDurationModel.find().exec();
        for (const assignmentDuration of assignmentsDurations) {
            if (assignmentDuration.duration > 0) {
                assignmentDuration.duration -= 1;
                await assignmentDuration.save();
                this.logger.log(`Decremented duration for ${assignmentDuration._id}, new duration: ${assignmentDuration.duration} seconds`);
                if (assignmentDuration.duration === 0) {
                    this.logger.log(`Duration expired for ${assignmentDuration._id}`);
                }
            }
        }
    }
    async findAll() {
        return this.assignmentDurationModel.find().exec();
    }
    async findOne(id) {
        const assignmentDuration = await this.assignmentDurationModel.findById(id).exec();
        if (!assignmentDuration) {
            throw new common_1.NotFoundException(`AssignmentDuration with ID "${id}" not found`);
        }
        return assignmentDuration;
    }
    async update(id, duration) {
        const updatedAssignmentDuration = await this.assignmentDurationModel.findByIdAndUpdate(id, { duration }, { new: true }).exec();
        if (!updatedAssignmentDuration) {
            throw new common_1.NotFoundException(`AssignmentDuration with ID "${id}" not found`);
        }
        return updatedAssignmentDuration;
    }
    async remove(id) {
        const assignmentDuration = await this.assignmentDurationModel.findByIdAndDelete(id).exec();
        if (!assignmentDuration) {
            throw new common_1.NotFoundException(`AssignmentDuration with ID "${id}" not found`);
        }
        return assignmentDuration;
    }
    async getRemainingDuration(assignmentId, userId) {
        const assignmentDuration = await this.assignmentDurationModel.findOne({
            assignment: assignmentId,
            user: userId,
        }).exec();
        if (!assignmentDuration) {
            throw new common_1.NotFoundException(`AssignmentDuration record not found for user "${userId}" and assignment "${assignmentId}"`);
        }
        return { remainingDuration: assignmentDuration.duration };
    }
};
exports.AssignmentDurationService = AssignmentDurationService;
__decorate([
    (0, schedule_1.Cron)('* * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssignmentDurationService.prototype, "handleCron", null);
exports.AssignmentDurationService = AssignmentDurationService = AssignmentDurationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(AssignmentDuration_Schema_1.AssignmentDuration.name)),
    __param(1, (0, mongoose_1.InjectModel)(Assignment_Schema_1.Assignment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AssignmentDurationService);
//# sourceMappingURL=AssignmentDuration.service.js.map