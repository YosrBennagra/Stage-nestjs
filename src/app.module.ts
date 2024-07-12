import { Module } from '@nestjs/common';
import { MongoDataServiceModule } from './Config/Mongo/mongo-data-service.module';
import { UserModule } from './uses-case/User/user.module';
import { ConfigModule } from '@nestjs/config';
import { SharedServiceModule } from './shared/shared-service/shared-service.module';
import { SharedService } from "./shared/shared-service/shared.service";
import { AuthModule } from './uses-case/Auth/auth.module';
import { EmailModule } from './uses-case/email/email.module';
import * as Joi from 'joi';
import { EmailConfirmationModule } from './uses-case/Auth/EmailConfirmation/emailConfirmation.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TwoFactorAuthenticationModule } from './uses-case/Auth/TwoFactorAuthentication/twoFactorAuthentication.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './uses-case/Auth/auth.guard';
import { OpenaiModule } from './uses-case/chatgpt/openai.module';
import { AssignmentModule } from './uses-case/Assignment/assignment.module';
import { Question } from './Schema/Question.Schema';
import { QuestionModule } from './uses-case/Question/question.module';
import { AnswerModule } from './uses-case/Answer/answer.module';
import { ResultModule } from './uses-case/Result/result.module';
import { GroupModule } from './uses-case/Group/group.module';
import { InstitutionModule } from './uses-case/Institution/institution.module';
import { SubjectModule } from './uses-case/Subject/subject.module';
import { LessonModule } from './uses-case/lesson/lesson.module';
import { ClassroomModule } from './uses-case/Classroom/classroom.module';
import { SchedulesModule } from './uses-case/Schedule/schedules.module';
import { SalaryModule } from './uses-case/Salary/salary.module';
import { UserInfoModule } from './uses-case/UserInfo/userInfo.module';

@Module({
  imports: [
    TwoFactorAuthenticationModule,
    EmailConfirmationModule,
    EmailModule,
    MongoDataServiceModule,
    UserModule,
    SharedServiceModule,
    AuthModule,
    QuestionModule,
    ResultModule,
    AnswerModule,
    ClassroomModule,
    AssignmentModule,
    GroupModule,
    InstitutionModule,
    SubjectModule,
    LessonModule,
    SalaryModule,
    UserInfoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    OpenaiModule,
    SchedulesModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
      })
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [
    /* {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, */
    SharedService,
  ],
})
export class AppModule { }
