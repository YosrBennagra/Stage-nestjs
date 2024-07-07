import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class File extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  filepath: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: false })
  mimetype?: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
