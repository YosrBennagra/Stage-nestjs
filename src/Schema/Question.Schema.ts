import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';




@Schema()
export class Question extends Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' })
  testId?: string;

  @Prop({ required: true })
  content: string;

  @Prop([String])
  options: string[];

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ required: true })
  type: string;

}

export const UserSchema = SchemaFactory.createForClass(Question);
