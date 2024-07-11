import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Classroom extends Document {

    @Prop({ required: true })
    name: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Group', required:false }])
    groups: string[];
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
