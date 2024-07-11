import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from 'src/Controllers/schedules.controller';

import { Schedules, SchedulesSchema } from 'src/Schema/Schedules.Schema';
import { Salary, SalarySchema } from 'src/Schema/Salary.Schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Schedules.name, schema: SchedulesSchema }]),MongooseModule.forFeature([{ name: Salary.name, schema: SalarySchema }])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule { } 
