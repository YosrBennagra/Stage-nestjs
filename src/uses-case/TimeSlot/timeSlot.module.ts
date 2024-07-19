import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeSlot, TimeSlotSchema } from 'src/Schema/TimeSlot.Schema';
import { TimeSlotController } from 'src/Controllers/timeSlot.controller';
import { TimeSlotService } from './timeSlot.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeSlot.name, schema: TimeSlotSchema }]),
    ],
  controllers: [TimeSlotController],
  providers: [TimeSlotService],
})
export class TimeSlotModule { } 
