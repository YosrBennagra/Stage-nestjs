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
exports.TimeSlotController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../Custom Decorators/public.decorator");
const timeSlot_service_1 = require("../uses-case/TimeSlot/timeSlot.service");
let TimeSlotController = class TimeSlotController {
    constructor(timeSlotService) {
        this.timeSlotService = timeSlotService;
    }
    async createTimeSlot(day, time, classId) {
        return this.timeSlotService.createTimeSlot(day, time, classId);
    }
    async getTimeSlotsByClassId(classId) {
        return this.timeSlotService.getTimeSlotsByClassId(classId);
    }
    async deleteTimeSlot(id) {
        return this.timeSlotService.deleteTimeSlot(id);
    }
};
exports.TimeSlotController = TimeSlotController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('day')),
    __param(1, (0, common_1.Body)('time')),
    __param(2, (0, common_1.Body)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "createTimeSlot", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':classId'),
    __param(0, (0, common_1.Param)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "getTimeSlotsByClassId", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "deleteTimeSlot", null);
exports.TimeSlotController = TimeSlotController = __decorate([
    (0, common_1.Controller)('timeslots'),
    __metadata("design:paramtypes", [timeSlot_service_1.TimeSlotService])
], TimeSlotController);
//# sourceMappingURL=timeSlot.controller.js.map