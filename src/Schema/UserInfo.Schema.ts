import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class UserInfo extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: false })
  classroom?: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: false })
  institution?: string;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);
