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
exports.AssignmentController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../Custom Decorators/public.decorator");
const assignment_service_1 = require("../uses-case/Assignment/assignment.service");
let AssignmentController = class AssignmentController {
    constructor(assignmentService) {
        this.assignmentService = assignmentService;
    }
    async create(createAssignmentDto) {
        return this.assignmentService.create(createAssignmentDto);
    }
    async findAll() {
        return this.assignmentService.findAll();
    }
    async findOne(id) {
        const assignment = await this.assignmentService.findOne(id);
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment #${id} not found`);
        }
        return assignment;
    }
    async update(id, updateAssignmentDto) {
        const assignment = await this.assignmentService.update(id, updateAssignmentDto);
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment #${id} not found`);
        }
        return assignment;
    }
    async remove(id) {
        const assignment = await this.assignmentService.remove(id);
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment #${id} not found`);
        }
        return assignment;
    }
    async addUser(assignmentId, id) {
        try {
            return await this.assignmentService.addUser(assignmentId, id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    async removeUser(assignmentId, id) {
        try {
            return await this.assignmentService.removeUser(assignmentId, id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    async addGroup(assignmentId, id) {
        try {
            return await this.assignmentService.addGroup(assignmentId, id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    async removeGroup(assignmentId, id) {
        try {
            return await this.assignmentService.removeGroup(assignmentId, id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    async updateAssignedUsers(assignmentId, userIdsToAdd) {
        try {
            const updatedAssignment = await this.assignmentService.updateAssignedUsers(assignmentId, userIdsToAdd);
            return updatedAssignment;
        }
        catch (error) {
            throw new Error(`Failed to update assigned users for assignment ${assignmentId}: ${error.message}`);
        }
    }
    async updateAssignedGroups(assignmentId, groupIdsToAdd) {
        try {
            const updatedAssignment = await this.assignmentService.updateAssignedGroups(assignmentId, groupIdsToAdd);
            return updatedAssignment;
        }
        catch (error) {
            throw new Error(`Failed to update assigned groups for assignment ${assignmentId}: ${error.message}`);
        }
    }
    async updatePasseduser(assignmentId, id) {
        try {
            const updatedAssignment = await this.assignmentService.updatePassUser(assignmentId, id);
            return updatedAssignment;
        }
        catch (error) {
            throw new Error(`Failed to update assigned users for assignment ${assignmentId}: ${error.message}`);
        }
    }
    async getAssignmentsByUserId(userId) {
        try {
            const assignments = await this.assignmentService.getAssignmentsByUserId(userId);
            if (!assignments) {
                throw new common_1.NotFoundException(`Assignments for userId ${userId} not found`);
            }
            return assignments;
        }
        catch (error) {
            console.error('Error fetching assignments:', error);
            throw error;
        }
    }
};
exports.AssignmentController = AssignmentController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "update", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "remove", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)(':assignmentId/addUser/:id'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "addUser", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)(':assignmentId/removeUser/:id'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "removeUser", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)(':assignmentId/addGroup/:id'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "addGroup", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)(':assignmentId/removeGroup/:id'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "removeGroup", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)('/:assignmentId/updateAssignedUsers'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "updateAssignedUsers", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)('/:assignmentId/updateAssignedGroups'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "updateAssignedGroups", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)('/:assignmentId/userPassed/:id'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "updatePasseduser", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('assignedToUserOrGroup/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssignmentController.prototype, "getAssignmentsByUserId", null);
exports.AssignmentController = AssignmentController = __decorate([
    (0, common_1.Controller)('assignments'),
    __metadata("design:paramtypes", [assignment_service_1.AssignmentService])
], AssignmentController);
//# sourceMappingURL=assignment.controller.js.map