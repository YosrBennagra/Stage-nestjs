

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignmentDurationController } from 'src/Controllers/assignmentDuration.controller';
import { AssignmentDuration, AssignmentDurationSchema } from 'src/Schema/AssignmentDuration.Schema';
import { AssignmentDurationService } from './AssignmentDuration.service';
import { Assignment, AssignmentSchema } from 'src/Schema/Assignment.Schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AssignmentDuration.name, schema: AssignmentDurationSchema }]),
        MongooseModule.forFeature([{ name: Assignment.name, schema: AssignmentSchema }])
    ],
    controllers: [AssignmentDurationController],
    providers: [AssignmentDurationService],
})
export class AssignmentDurationModule { }
