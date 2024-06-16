import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TypeQuestion } from './Enum/TypeQuestion';




@Schema()
export class Question extends Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' })
  assignementId: string;

  @Prop({ required: true })
  content: string;

  @Prop([String])
  options?: string[];

  @Prop({ required: true })
  correctAnswer?: string;

  @Prop({ required: true })
  type: TypeQuestion;

  @Prop({ required: true })
  score?: number;

}

export const QuestionSchema = SchemaFactory.createForClass(Question);
