import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from "./Enum/Role";
import { TypeAccount } from './Enum/TypeAccount';
import { TypeSalary } from './Enum/TypeSalary';

@Schema()
export class User extends Document {


  @Prop({ required: false })
  username: string;

  @Prop({ required: false })
  firstname: string;

  @Prop({ required: false })
  lastname: string;

  @Prop({ required: false })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  Role: Role;

  @Prop({ required: false })
  status: TypeAccount;

  @Prop({ required: false })
  isEmailConfirmed: boolean;

  @Prop({ required: false })
  twoFactorAuthenticationSecret?: string;

  @Prop({ required: false })
  isTwoFactorAuthenticationEnabled: boolean;

  @Prop({ required: false })
  currentHashedRefreshToken?: string;

  @Prop({ required: false })
  passResetToken: string;

  @Prop({ required: false })
  profilePicture: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Institution' })
  institution?: string;


}

export const UserSchema = SchemaFactory.createForClass(User);
