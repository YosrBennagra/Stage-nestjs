import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AssignmentService } from './assignment.service';
import { Assignment, AssignmentSchema  } from 'src/Schema/Assignment.Schema';
import { AssignmentController } from 'src/Controllers/assignment.controller';
import { Group, GroupSchema } from 'src/Schema/Group.Schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Assignment.name, schema: AssignmentSchema }]),MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  providers: [AssignmentService],
  controllers: [AssignmentController],
  exports: [AssignmentService],
})
export class AssignmentModule {}
