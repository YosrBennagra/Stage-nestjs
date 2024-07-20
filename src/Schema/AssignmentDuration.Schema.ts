import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';




@Schema()
export class AssignmentDuration extends Document {

  @Prop({ required: false })
  duration?: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' })
  assignment?: string;

}


export const AssignmentDurationSchema  = SchemaFactory.createForClass(AssignmentDuration);
