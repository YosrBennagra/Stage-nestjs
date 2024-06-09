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





@Module({
  imports: [
    TwoFactorAuthenticationModule,
    EmailConfirmationModule,
    EmailModule,
    MongoDataServiceModule,
    UserModule,
    SharedServiceModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    OpenaiModule,
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
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SharedService,
  ],
})
export class AppModule { }
