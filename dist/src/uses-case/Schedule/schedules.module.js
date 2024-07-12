"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schedules_service_1 = require("./schedules.service");
const schedules_controller_1 = require("../../Controllers/schedules.controller");
const Schedules_Schema_1 = require("../../Schema/Schedules.Schema");
const Salary_Schema_1 = require("../../Schema/Salary.Schema");
const User_Schema_1 = require("../../Schema/User.Schema");
let SchedulesModule = class SchedulesModule {
};
exports.SchedulesModule = SchedulesModule;
exports.SchedulesModule = SchedulesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: Schedules_Schema_1.Schedules.name, schema: Schedules_Schema_1.SchedulesSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: Salary_Schema_1.Salary.name, schema: Salary_Schema_1.SalarySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: User_Schema_1.User.name, schema: User_Schema_1.UserSchema }])
        ],
        controllers: [schedules_controller_1.SchedulesController],
        providers: [schedules_service_1.SchedulesService],
    })
], SchedulesModule);
//# sourceMappingURL=schedules.module.js.map