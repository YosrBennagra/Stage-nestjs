"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Salary_Schema_1 = require("../../Schema/Salary.Schema");
const salary_service_1 = require("./salary.service");
const salary_controller_1 = require("../../Controllers/salary.controller");
const User_Schema_1 = require("../../Schema/User.Schema");
const schedules_service_1 = require("../Schedule/schedules.service");
const Schedules_Schema_1 = require("../../Schema/Schedules.Schema");
const Group_Schema_1 = require("../../Schema/Group.Schema");
let SalaryModule = class SalaryModule {
};
exports.SalaryModule = SalaryModule;
exports.SalaryModule = SalaryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: Salary_Schema_1.Salary.name, schema: Salary_Schema_1.SalarySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: User_Schema_1.User.name, schema: User_Schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: Schedules_Schema_1.Schedules.name, schema: Schedules_Schema_1.SchedulesSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: Group_Schema_1.Group.name, schema: Group_Schema_1.GroupSchema }])
        ],
        controllers: [salary_controller_1.SalaryController],
        providers: [salary_service_1.SalaryService, schedules_service_1.SchedulesService],
    })
], SalaryModule);
//# sourceMappingURL=salary.module.js.map