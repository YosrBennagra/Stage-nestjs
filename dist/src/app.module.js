"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongo_data_service_module_1 = require("./Config/Mongo/mongo-data-service.module");
const user_module_1 = require("./uses-case/User/user.module");
const config_1 = require("@nestjs/config");
const shared_service_module_1 = require("./shared/shared-service/shared-service.module");
const shared_service_1 = require("./shared/shared-service/shared.service");
const auth_module_1 = require("./uses-case/Auth/auth.module");
const email_module_1 = require("./uses-case/email/email.module");
const Joi = require("joi");
const emailConfirmation_module_1 = require("./uses-case/Auth/EmailConfirmation/emailConfirmation.module");
const schedule_1 = require("@nestjs/schedule");
const twoFactorAuthentication_module_1 = require("./uses-case/Auth/TwoFactorAuthentication/twoFactorAuthentication.module");
const openai_module_1 = require("./uses-case/chatgpt/openai.module");
const assignment_module_1 = require("./uses-case/Assignment/assignment.module");
const question_module_1 = require("./uses-case/Question/question.module");
const answer_module_1 = require("./uses-case/Answer/answer.module");
const result_module_1 = require("./uses-case/Result/result.module");
const group_module_1 = require("./uses-case/Group/group.module");
const institution_module_1 = require("./uses-case/Institution/institution.module");
const subject_module_1 = require("./uses-case/Subject/subject.module");
const lesson_module_1 = require("./uses-case/lesson/lesson.module");
const classroom_module_1 = require("./uses-case/Classroom/classroom.module");
const schedules_module_1 = require("./uses-case/Schedule/schedules.module");
const salary_module_1 = require("./uses-case/Salary/salary.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            twoFactorAuthentication_module_1.TwoFactorAuthenticationModule,
            emailConfirmation_module_1.EmailConfirmationModule,
            email_module_1.EmailModule,
            mongo_data_service_module_1.MongoDataServiceModule,
            user_module_1.UserModule,
            shared_service_module_1.SharedServiceModule,
            auth_module_1.AuthModule,
            question_module_1.QuestionModule,
            result_module_1.ResultModule,
            answer_module_1.AnswerModule,
            classroom_module_1.ClassroomModule,
            assignment_module_1.AssignmentModule,
            group_module_1.GroupModule,
            institution_module_1.InstitutionModule,
            subject_module_1.SubjectModule,
            lesson_module_1.LessonModule,
            salary_module_1.SalaryModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            openai_module_1.OpenaiModule,
            schedules_module_1.SchedulesModule,
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    EMAIL_SERVICE: Joi.string().required(),
                    EMAIL_USER: Joi.string().required(),
                    EMAIL_PASSWORD: Joi.string().required(),
                })
            }),
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [],
        providers: [
            shared_service_1.SharedService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map