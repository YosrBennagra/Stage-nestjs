import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';




@Schema()
export class Assignment extends Document {


  @Prop({ required: false })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy?: string;

  @Prop([{  type: mongoose.Schema.Types.ObjectId, ref: 'User'  }])
  assignedTo?: string[];

  @Prop({ required: false })
  date: Date;

  @Prop({ required: false })
  time: string;

}

export const UserSchema = SchemaFactory.createForClass(Assignment);
