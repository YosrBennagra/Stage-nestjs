"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Result_Schema_1 = require("../../Schema/Result.Schema");
const result_service_1 = require("./result.service");
const result_controller_1 = require("../../Controllers/result.controller");
const Answer_Schema_1 = require("../../Schema/Answer.Schema");
const Question_Schema_1 = require("../../Schema/Question.Schema");
let ResultModule = class ResultModule {
};
exports.ResultModule = ResultModule;
exports.ResultModule = ResultModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: Result_Schema_1.Result.name, schema: Result_Schema_1.ResultSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: Answer_Schema_1.Answer.name, schema: Answer_Schema_1.AnswerSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: Question_Schema_1.Question.name, schema: Question_Schema_1.QuestionSchema }])
        ],
        providers: [result_service_1.ResultService],
        controllers: [result_controller_1.ResultController],
        exports: [result_service_1.ResultService],
    })
], ResultModule);
//# sourceMappingURL=result.module.js.map