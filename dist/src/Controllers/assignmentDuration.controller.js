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
exports.AssignmentDurationController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../Custom Decorators/public.decorator");
const AssignmentDuration_service_1 = require("../uses-case/AssignmentDuration/AssignmentDuration.service");
let AssignmentDurationController = class AssignmentDurationController {
    constructor(assignmentDurationService) {
        this.assignmentDurationService = assignmentDurationService;
    }
    async create(createAssignmentDurationDto) {
        const { user, assignment } = createAssignmentDurationDto;
        return this.assignmentDurationService.createAssignmentDuration(user, assignment);
    }
    async findAll() {
        return this.assignmentDurationService.findAll();
    }
    async findOne(id) {
        return this.assignmentDurationService.findOne(id);
    }
    async update(id, duration) {
        return this.assignmentDurationService.update(id, duration);
    }
    async remove(id) {
        return this.assignmentDurationService.remove(id);
    }
    async getRemainingDuration(assignmentId, userId) {
        return this.assignmentDurationService.getRemainingDuration(assignmentId, userId);
    }
};
exports.AssignmentDurationController = AssignmentDurationController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssignmentDurationController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssignmentDurationController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssignmentDurationController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('duration')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], AssignmentDurationController.prototype, "update", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssignmentDurationController.prototype, "remove", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':assignmentId/:userId'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AssignmentDurationController.prototype, "getRemainingDuration", null);
exports.AssignmentDurationController = AssignmentDurationController = __decorate([
    (0, common_1.Controller)('assignment-durations'),
    __metadata("design:paramtypes", [AssignmentDuration_service_1.AssignmentDurationService])
], AssignmentDurationController);
//# sourceMappingURL=assignmentDuration.controller.js.map