import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { File } from './file.schema'; // Make sure to import the File schema

@Schema()
export class Lesson extends Document {

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Subject' })
  subject: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Assignment' })
  assignment?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Group'  })
  group?: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'File' }] })
  files?: File[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
