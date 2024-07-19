import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TimeSlot extends Document {
  @Prop({ required: true })
  day: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  classId: string;
}

export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);
