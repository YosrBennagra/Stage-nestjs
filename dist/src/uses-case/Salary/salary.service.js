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
const Salary_Schema_1 = require("../../Schema/Salary.Schema");
let SalaryService = class SalaryService {
    constructor(salaryModel) {
        this.salaryModel = salaryModel;
    }
    async getSalary() {
        return this.salaryModel.find().exec();
    }
    async createOrUpdateSalary(teacherId, updates) {
        let salary = await this.salaryModel.findOne({ TeacherId: teacherId });
        if (!salary) {
            salary = new this.salaryModel({ TeacherId: teacherId, ...updates });
        }
        else {
            Object.assign(salary, updates);
        }
        if (salary.salaryType) {
            salary.salary = (salary.hours ?? 0) * (salary.salaryPerHour ?? 0);
        }
        else {
            salary.salary = updates.salary ?? salary.salary;
        }
        await salary.save();
        return salary;
    }
    async updateSalary(teacherId, updates) {
        const salary = await this.salaryModel.findOneAndUpdate({ TeacherId: teacherId }, { $set: updates }, { new: true });
        if (salary.salaryType) {
            salary.salary = (salary.hours ?? 0) * (salary.salaryPerHour ?? 0);
        }
        else {
            salary.salary = updates.salary ?? salary.salary;
        }
        await salary.save();
        return salary;
    }
};
exports.SalaryService = SalaryService;
exports.SalaryService = SalaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Salary_Schema_1.Salary.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SalaryService);
//# sourceMappingURL=salary.service.js.map