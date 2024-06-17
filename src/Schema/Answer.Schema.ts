import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';




@Schema()
export class Answer extends Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
  questionId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  studentId: string;

  @Prop({ required: true })
  content?: string[];

  @Prop({ required: true })
  isCorrect: boolean;

  @Prop({ required: true })
  score: number;
  
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
