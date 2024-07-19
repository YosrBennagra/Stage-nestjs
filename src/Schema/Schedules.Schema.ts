import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';



@Schema()
export class Schedules extends Document {

  @Prop({ required: true })
  classId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' })
  subject?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  teacher?: string;

  @Prop({ required: true })
  day: string;

  @Prop({ required: true })
  time: string;
}


export const SchedulesSchema = SchemaFactory.createForClass(Schedules);
