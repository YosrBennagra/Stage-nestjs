import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TypeSalary } from './Enum/TypeSalary';

@Schema()
export class Salary extends Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    TeacherId: string;

    @Prop({ required: false })
    salaryType?: TypeSalary;

    @Prop({ required: false })
    salary?: number;

    @Prop({ required: false })
    salaryPerHour?: number;

    @Prop({ required: false })
    hours?: number;
}

export const SalarySchema = SchemaFactory.createForClass(Salary);
