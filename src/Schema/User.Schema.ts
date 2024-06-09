import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from "./Enum/Role";



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

}

export const UserSchema = SchemaFactory.createForClass(User);
