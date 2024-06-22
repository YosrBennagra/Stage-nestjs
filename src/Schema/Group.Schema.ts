import {Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema()
export class Group extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  users: mongoose.Schema.Types.ObjectId[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);