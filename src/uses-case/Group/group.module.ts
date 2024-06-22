import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupService } from './group.service';
import { GroupController } from 'src/Controllers/group.controller';
import { Group, GroupSchema } from 'src/Schema/Group.Schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
