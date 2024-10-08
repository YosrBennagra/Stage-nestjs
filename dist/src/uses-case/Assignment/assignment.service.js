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
const schedule_1 = require("@nestjs/schedule");
const date_fns_1 = require("date-fns");
const mongoose_2 = require("mongoose");
const Assignment_Schema_1 = require("../../Schema/Assignment.Schema");
const TypeStatus_1 = require("../../Schema/Enum/TypeStatus");
const Group_Schema_1 = require("../../Schema/Group.Schema");
let AssignmentService = class AssignmentService {
    constructor(assignmentModel, groupModel) {
        this.assignmentModel = assignmentModel;
        this.groupModel = groupModel;
    }
    async create(createAssignmentDto) {
        const createAtdate = new Date();
        const formattedDate = (0, date_fns_1.format)(createAtdate, 'yyyy-MM-dd HH:mm:ss');
        const createdAssignment = new this.assignmentModel({
            ...createAssignmentDto,
            createAtdate: formattedDate,
            status: TypeStatus_1.TypeStatus.PENDING,
            isScheduled: false,
            isVisible: false,
        });
        return createdAssignment.save();
    }
    async findAll() {
        return this.assignmentModel.find().populate('createdBy').exec();
    }
    async findOne(id) {
        const assignment = await this.assignmentModel.findById(id).populate('assignedToUsers').populate('assignedToGroups').exec();
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
    async addUser(assignmentId, id) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment #${assignmentId} not found`);
        }
        if (assignment.assignedToUsers.includes(id)) {
            return assignment;
        }
        const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(assignmentId, { $push: { assignedToUsers: id } }, { new: true }).exec();
        return updatedAssignment;
    }
    async removeUser(assignmentId, id) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment #${assignmentId} not found`);
        }
        if (!assignment.assignedToUsers.includes(id)) {
            throw new common_1.NotFoundException(`User #${id} not assigned to this assignment`);
        }
        const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(assignmentId, { $pull: { assignedToUsers: id } }, { new: true }).exec();
        if (!updatedAssignment) {
            throw new common_1.NotFoundException(`Assignment #${assignmentId} not found after update`);
        }
        return updatedAssignment;
    }
    async addGroup(assignmentId, id) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment #${assignmentId} not found`);
        }
        if (assignment.assignedToGroups.includes(id)) {
            return assignment;
        }
        const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(assignmentId, { $push: { assignedToGroups: id } }, { new: true }).exec();
        return updatedAssignment;
    }
    async removeGroup(assignmentId, id) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment #${assignmentId} not found`);
        }
        if (!assignment.assignedToGroups.includes(id)) {
            throw new common_1.NotFoundException(`Group #${id} not assigned to this assignment`);
        }
        const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(assignmentId, { $pull: { assignedToGroups: id } }, { new: true }).exec();
        return updatedAssignment;
    }
    async updateAssignedUsers(assignmentId, newAssignedUsers) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment #${assignmentId} not found`);
        }
        const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(assignmentId, { $set: { assignedToUsers: newAssignedUsers } }, { new: true }).exec();
        return updatedAssignment;
    }
    async updateAssignedGroups(assignmentId, newAssignedGroups) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment #${assignmentId} not found`);
        }
        const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(assignmentId, { $set: { assignedToGroups: newAssignedGroups } }, { new: true }).exec();
        return updatedAssignment;
    }
    async updatePassUser(assignmentId, id) {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment #${assignmentId} not found`);
        }
        const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(assignmentId, { $push: { userpassed: id } }, { new: true }).exec();
        return updatedAssignment;
    }
    async getAssignmentsByUserId(userId) {
        try {
            const assignments = await this.assignmentModel.find({
                $and: [
                    {
                        $or: [
                            { assignedToUsers: userId },
                            { assignedToGroups: { $in: await this.getGroupsByUserId(userId) } }
                        ]
                    },
                    {
                        $or: [
                            { isInterval: false },
                            { openAt: { $lte: new Date() } }
                        ]
                    }
                ]
            }).populate('createdBy').exec();
            const filteredAssignments = assignments.filter(assignment => !assignment.isInterval || new Date(assignment.openAt) <= new Date());
            return filteredAssignments;
        }
        catch (error) {
            console.error('Error fetching assignments:', error);
            throw error;
        }
    }
    async getGroupsByUserId(userId) {
        try {
            const groups = await this.groupModel.find({ users: userId }).exec();
            return groups.map(group => group._id);
        }
        catch (error) {
            console.error('Error fetching groups:', error);
            throw error;
        }
    }
    async handleAssignmentStatusUpdates() {
        try {
            await this.updateAssignmentsStatus();
        }
        catch (error) {
            console.error('Error updating assignment statuses:', error);
        }
    }
    async updateAssignmentsStatus() {
        const assignments = await this.assignmentModel.find();
        const now = new Date();
        for (const assignment of assignments) {
            if (new Date(assignment.openAt) <= now) {
                assignment.status = TypeStatus_1.TypeStatus.OPEN;
                await assignment.save();
            }
            if (new Date(assignment.closedAt) <= now) {
                assignment.status = TypeStatus_1.TypeStatus.ENDED;
                await assignment.save();
            }
        }
    }
};
exports.AssignmentService = AssignmentService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_SECOND),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssignmentService.prototype, "handleAssignmentStatusUpdates", null);
exports.AssignmentService = AssignmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Assignment_Schema_1.Assignment.name)),
    __param(1, (0, mongoose_1.InjectModel)(Group_Schema_1.Group.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], AssignmentService);
//# sourceMappingURL=assignment.service.js.map