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
exports.TimeSlotService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const TimeSlot_Schema_1 = require("../../Schema/TimeSlot.Schema");
let TimeSlotService = class TimeSlotService {
    constructor(timeSlotModel) {
        this.timeSlotModel = timeSlotModel;
    }
    async createTimeSlot(day, time, classId) {
        const newTimeSlot = new this.timeSlotModel({ day, time, classId });
        return newTimeSlot.save();
    }
    async getTimeSlotsByClassId(classId) {
        return this.timeSlotModel.find({ classId }).exec();
    }
    async deleteTimeSlot(id) {
        return this.timeSlotModel.findByIdAndDelete(id).exec();
    }
};
exports.TimeSlotService = TimeSlotService;
exports.TimeSlotService = TimeSlotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(TimeSlot_Schema_1.TimeSlot.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TimeSlotService);
//# sourceMappingURL=timeSlot.service.js.map