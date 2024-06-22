import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TypeStatus } from './Enum/TypeStatus';




@Schema()
export class Assignment extends Document {


  @Prop({ required: false })
  title?: string;

  @Prop()
  description?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy?: string;

  @Prop([{  type: mongoose.Schema.Types.ObjectId, ref: 'User'  }])
  assignedToUsers?: string[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }])
  assignedToGroups?: mongoose.Schema.Types.ObjectId[];

  @Prop({ required: false })
  status: TypeStatus;

  @Prop({ required: false })
  createAtdate: Date;

  @Prop({ required: false })
  openAt: Date;

  @Prop({ required: false })
  closedAt: Date;

  @Prop({ required: false })
  duration: number;

}

export const AssignmentSchema  = SchemaFactory.createForClass(Assignment);
