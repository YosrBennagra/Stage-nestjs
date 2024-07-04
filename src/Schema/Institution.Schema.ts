import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Institution extends Document {

    @Prop({ required: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required:false })
    responsables: string[];
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
