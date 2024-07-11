import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Salary, SalarySchema } from 'src/Schema/Salary.Schema';
import { SalaryService } from './salary.service';
import { SalaryController } from 'src/Controllers/salary.controller';
import { User, UserSchema } from 'src/Schema/User.Schema';
import { SchedulesService } from '../Schedule/schedules.service';
import { Schedules, SchedulesSchema } from 'src/Schema/Schedules.Schema';
import { Group, GroupSchema } from 'src/Schema/Group.Schema';




@Module({
  imports: [
    MongooseModule.forFeature([{ name: Salary.name, schema: SalarySchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Schedules.name, schema: SchedulesSchema }]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }])
],
  controllers: [SalaryController],
  providers: [SalaryService,SchedulesService],
})
export class SalaryModule { } 
