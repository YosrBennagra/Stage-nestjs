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
exports.SalaryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Role_1 = require("../../Schema/Enum/Role");
const Salary_Schema_1 = require("../../Schema/Salary.Schema");
const User_Schema_1 = require("../../Schema/User.Schema");
const Group_Schema_1 = require("../../Schema/Group.Schema");
const Schedules_Schema_1 = require("../../Schema/Schedules.Schema");
let SalaryService = class SalaryService {
    constructor(userModel, salaryModel, groupModel, schedulesModel) {
        this.userModel = userModel;
        this.salaryModel = salaryModel;
        this.groupModel = groupModel;
        this.schedulesModel = schedulesModel;
    }
    async calculateTeacherHours(teacherId) {
        const teacherObjectId = new mongoose_2.default.Types.ObjectId(teacherId);
        const aggregationResult = await this.schedulesModel.aggregate([
            {
                $lookup: {
                    from: 'groups',
                    localField: 'schedule',
                    foreignField: '_id',
                    as: 'groups',
                },
            },
            {
                $unwind: '$groups',
            },
            {
                $match: {
                    'groups.users': teacherObjectId,
                },
            },
            {
                $project: {
                    schedule: 1,
                    groups: 1,
                },
            },
            {
                $addFields: {
                    scheduleArray: { $objectToArray: "$schedule" },
                },
            },
            {
                $unwind: "$scheduleArray",
            },
            {
                $match: {
                    "scheduleArray.v": { $in: ["667766c0133adba1723381dd"] }
                },
            },
            {
                $group: {
                    _id: teacherObjectId,
                    totalHours: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalHours: 1,
                },
            },
        ]);
        console.log("🚀 ~ file: salary.service.ts:61 ~ SalaryService ~ calculateTeacherHours ~ aggregationResult:", aggregationResult);
        return aggregationResult[0]?.totalHours || 0;
    }
    async FillTeachers() {
        try {
            const teachers = await this.userModel.find({ Role: Role_1.Role.TEACHER });
            for (const teacher of teachers) {
                const existingSalary = await this.salaryModel.findOne({ TeacherId: teacher._id });
                const hours = await this.calculateTeacherHours(teacher._id.toString());
                if (existingSalary) {
                    existingSalary.hours = hours;
                    await existingSalary.save();
                }
                else {
                    await this.salaryModel.create({ TeacherId: teacher._id, hours });
                }
            }
        }
        catch (error) {
            console.error('Error filling salaries for teachers:', error);
            throw error;
        }
    }
};
exports.SalaryService = SalaryService;
exports.SalaryService = SalaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_Schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(Salary_Schema_1.Salary.name)),
    __param(2, (0, mongoose_1.InjectModel)(Group_Schema_1.Group.name)),
    __param(3, (0, mongoose_1.InjectModel)(Schedules_Schema_1.Schedules.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SalaryService);
//# sourceMappingURL=salary.service.js.map