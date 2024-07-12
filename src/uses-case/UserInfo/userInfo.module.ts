import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { UserInfo, UserInfoSchema } from 'src/Schema/UserInfo.Schema';
import { UserInfoController } from 'src/Controllers/userInfo.controller';
import { UserInfoService } from './userInfo.service';





@Module({
  imports: [MongooseModule.forFeature([{ name: UserInfo.name, schema: UserInfoSchema }]),
  ],
  providers: [UserInfoService],
  controllers: [UserInfoController],
  exports: [UserInfoService],
})
export class UserInfoModule {}
