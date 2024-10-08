import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Result extends Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' })
  assignmentId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  studentId: string;

  @Prop({ required: true })
  score: number;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
