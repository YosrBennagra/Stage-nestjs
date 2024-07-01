import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Subject extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  coefficient: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true })
  institution: string;

  @Prop({ required: false })
  departement?: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
