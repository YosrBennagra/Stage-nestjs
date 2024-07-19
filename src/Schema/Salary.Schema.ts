import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema()
export class Salary extends Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    TeacherId: string;

    @Prop({ required: false })
    salaryType?: boolean;

    @Prop({ required: false, default: 0 })
    salary?: number;

    @Prop({ required: false, default: 0 })
    salaryPerHour?: number;

    @Prop({ required: false, default: 0 })
    hours?: number;


}

export const SalarySchema = SchemaFactory.createForClass(Salary);
