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
exports.ResultController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../Custom Decorators/public.decorator");
const result_service_1 = require("../uses-case/Result/result.service");
let ResultController = class ResultController {
    constructor(resultService) {
        this.resultService = resultService;
    }
    async create(createResultDto) {
        return this.resultService.create(createResultDto);
    }
    async findAll() {
        return this.resultService.findAll();
    }
    async findOne(id) {
        const result = await this.resultService.findOne(id);
        if (!result) {
            throw new common_1.NotFoundException(`Result #${id} not found`);
        }
        return result;
    }
    async update(id, updateResultDto) {
        const result = await this.resultService.update(id, updateResultDto);
        if (!result) {
            throw new common_1.NotFoundException(`Result #${id} not found`);
        }
        return result;
    }
    async remove(id) {
        const result = await this.resultService.remove(id);
        if (!result) {
            throw new common_1.NotFoundException(`Result #${id} not found`);
        }
        return result;
    }
    async calculateAndSaveResults(studentId) {
        return this.resultService.calculateAndSaveResults(studentId);
    }
    async GetAssignmentResults(studentId, assignmentId) {
        try {
            return await this.resultService.getResultByStudentAndAssignment(studentId, assignmentId);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async GetAssignmentResultsByStudent(studentId) {
        try {
            return await this.resultService.getResultByStudent(studentId);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
};
exports.ResultController = ResultController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "update", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "remove", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/student/:studentId/calculate'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "calculateAndSaveResults", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/student/:studentId/:assignmentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Param)('assignmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "GetAssignmentResults", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/student/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "GetAssignmentResultsByStudent", null);
exports.ResultController = ResultController = __decorate([
    (0, common_1.Controller)('results'),
    __metadata("design:paramtypes", [result_service_1.ResultService])
], ResultController);
//# sourceMappingURL=result.controller.js.map