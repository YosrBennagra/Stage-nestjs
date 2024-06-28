import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TypeStatus } from './Enum/TypeStatus';
import { format } from 'date-fns';




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

  @Prop({ required: false, set: (val: Date) => format(val, 'yyyy-MM-dd HH:mm:ss') })
  createAtdate: string;

  @Prop({ required: false })
  openAt: string;

  @Prop({ required: false })
  closedAt: string;

  @Prop({ required: false })
  duration: number;

  //0 = instant, 1 = scheduled
  @Prop({ required: false })
  isScheduled: boolean;

  //0= private, 1 = public  
  @Prop({ required: false })
  isVisible: boolean;

  @Prop({ required: false })
  isInterval: boolean;

  @Prop({ required: false })
  dateSchedule: string;
}


export const AssignmentSchema  = SchemaFactory.createForClass(Assignment);
