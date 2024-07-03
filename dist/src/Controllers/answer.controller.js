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
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../Custom Decorators/public.decorator");
const answer_service_1 = require("../uses-case/Answer/answer.service");
let AnswerController = class AnswerController {
    constructor(answerService) {
        this.answerService = answerService;
    }
    async create(createAnswerDto) {
        return this.answerService.create(createAnswerDto);
    }
    async findAll() {
        return this.answerService.findAll();
    }
    async findOne(id) {
        const answer = await this.answerService.findOne(id);
        if (!answer) {
            throw new common_1.NotFoundException(`answer #${id} not found`);
        }
        return answer;
    }
    async update(id, studentid, updateAnswerDto) {
        const answer = await this.answerService.update(id, studentid, updateAnswerDto);
        if (!answer) {
            throw new common_1.NotFoundException(`answer #${id} not found`);
        }
        return answer;
    }
    async remove(id) {
        const answer = await this.answerService.remove(id);
        if (!answer) {
            throw new common_1.NotFoundException(`answer #${id} not found`);
        }
        return answer;
    }
};
exports.AnswerController = AnswerController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)(':id/:studentid'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('studentid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "update", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "remove", null);
exports.AnswerController = AnswerController = __decorate([
    (0, common_1.Controller)('answers'),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
//# sourceMappingURL=answer.controller.js.map