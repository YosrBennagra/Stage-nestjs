import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';



@Schema()
export class Schedules extends Document {

  @Prop({ required: true })
  classId: string;

  @Prop({
    required: true,
    type: Map,
    of: { type: Types.ObjectId, ref: 'Group' },
  })
  schedule: Map<string, Types.ObjectId>;
}


export const SchedulesSchema = SchemaFactory.createForClass(Schedules);
