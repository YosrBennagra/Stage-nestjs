import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupService } from './group.service';
import { GroupController } from 'src/Controllers/group.controller';
import { Group, GroupSchema } from 'src/Schema/Group.Schema';
import { UserService } from '../User/user.service';
import { User, UserSchema } from 'src/Schema/User.Schema';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
