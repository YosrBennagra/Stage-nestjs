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
exports.SchedulesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Salary_Schema_1 = require("../../Schema/Salary.Schema");
const Schedules_Schema_1 = require("../../Schema/Schedules.Schema");
let SchedulesService = class SchedulesService {
    constructor(scheduleModel, salaryModel) {
        this.scheduleModel = scheduleModel;
        this.salaryModel = salaryModel;
    }
    async getSchedule(classId) {
        return this.scheduleModel.findOne({ classId }).exec();
    }
    async createSchedule(classId, createScheduleDto) {
        return this.scheduleModel.findOneAndUpdate({ classId }, createScheduleDto, { new: true, upsert: true }).exec();
    }
    async findAll() {
        return this.scheduleModel.find().populate('schedule').populate({ path: 'schedule', populate: { path: 'users' } }).exec();
    }
};
exports.SchedulesService = SchedulesService;
exports.SchedulesService = SchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Schedules_Schema_1.Schedules.name)),
    __param(1, (0, mongoose_1.InjectModel)(Salary_Schema_1.Salary.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], SchedulesService);
//# sourceMappingURL=schedules.service.js.map