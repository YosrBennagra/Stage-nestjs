import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { User } from "../../Schema/User.Schema";
import { UserRepository } from "./UserRepo/user.repository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreatUserDto } from "./DTO/CreatUser.dto";

import * as bcrypt from 'bcrypt';
import { LoginDto } from "./DTO/Login.dto";
import * as crypto from 'crypto';
import EmailService from "../email/email.service";
import { Role } from "src/Schema/Enum/Role";
import { TypeAccount } from "src/Schema/Enum/TypeAccount";

@Injectable()
export class UserService {

  constructor(
    private readonly emailService: EmailService,
    private readonly userRe: UserRepository, @InjectModel(User.name) private userModel: Model<User>,
  ) {
  }

  async CreatUser({ ...creatUserDto }: CreatUserDto) {
    let randomNumber: number;
    let usernameWithNumber: string;
    let userExists: boolean;
    const existingUser = await this.userRe.findOne({ email: creatUserDto.email });
    if (existingUser) {
      throw new Error("There is already an account with this email.");
    }
    do {
      randomNumber = Math.floor(Math.random() * 10000);
      const paddedNumber = randomNumber.toString().padStart(4, '0');
      usernameWithNumber = `${creatUserDto.username}#${paddedNumber}`;
      userExists = await this.userRe.findUserWithNumber(usernameWithNumber);
    } while (userExists);

    const saltOrRounds = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
    const password = creatUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const isMatch = await bcrypt.compare(creatUserDto.password, hash);
    const newuser = new this.userModel({
      ...creatUserDto,
      password: hash,
      Role: Role.STUDENT,
      username: usernameWithNumber,
      isEmailConfirmed: false,
      isTwoFactorAuthenticationEnabled: false,
      twoFactorAuthenticationSecret: '',
      passResetToken: '',
      profilePicture: '660036990442903a5ff041ff'
    });

    const savedUser = await newuser.save();

    await savedUser.save();
    console.log("Hash: ", hash);
    console.log("Are The Password and the hash are matched? : ", isMatch);
    console.log("The New User: ", newuser);


    return savedUser;
  }

  async loginUser(loginDto: LoginDto) {
    const user = await this.userRe.findOne({ email: loginDto.email });
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Mot de passe incorrect");
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }


  deleteUser(id: string) {
    return this.userRe.delete(id);

  }


  findOneUser(id: string) {
    return this.userRe.findById(id);
  }

  findUserByEmail(email: string) {
    return this.userRe.findByEmail(email);
  }

  async findUserByRole(role: string, search: string, limit: number, offset: number): Promise<{ users: User[], count: number }> {
    const { users, count } = await this.userRe.findByRole(role, search, limit, offset);
    if (!users || users.length === 0) {
      throw new NotFoundException('Users not found');
    }
    return { users, count };
  }

  async findUsersByStatusNotConfirmed(search: string, limit: number, offset: number): Promise<{ users: User[], count: number }> {
    const query = { status: TypeAccount.NOTCONFIRMED };

    if (search) {
      query['$or'] = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await this.userModel
      .find(query)
      .skip(offset)
      .limit(limit)
      .exec();

    const count = await this.userModel.countDocuments(query).exec();

    return { users, count };
  }



  UpdateUser(id: string, creatuserdto: CreatUserDto) {
    return this.userRe.update(id, creatuserdto);
  }

  AcceptStudent(id: string) {
    return this.userModel.findByIdAndUpdate(id,{status: TypeAccount.CONFIRMED} );
  }

  UpdateUser2(id: string, firstname: string, lastname: string) {
    return this.userRe.updateUserFirstnameAndLastname(id, firstname, lastname);
  }


  async markEmailAsConfirmed(id: string) {
    return this.userRe.update(id, {
      isEmailConfirmed: true
    });
  }


  //@Cron("*/10 * * * * *")
  async deleteUnconfirmedUsers() {
    try {
      //console.log("10s");
      const deletedUsers = await this.userModel.deleteMany({ isEmailConfirmed: false });
      if (deletedUsers.deletedCount > 0) {
        console.log(`${deletedUsers.deletedCount} user(s) were deleted.`);
        console.log('Deleted users:', deletedUsers);
      }
    } catch (error) {
      console.error('Error deleting unconfirmed users:', error);
    }
  }

  async deleteUserProfile(userId: string) {
    try {
      const deletedUser = await this.userModel.deleteOne({ userId: userId });
      console.log('Deleted one user:', deletedUser);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: string) {
    return this.userRe.update(userId, {
      twoFactorAuthenticationSecret: secret
    });
  }

  async turnOnTwoFactorAuthentication(userId: string): Promise<boolean> {
    const userDoc = await this.userRe.findById(userId);
    if (!userDoc) {
      throw new Error('User not found');
    }


    const updatedValue = !userDoc.isTwoFactorAuthenticationEnabled;


    await this.userRe.update(userId, {
      isTwoFactorAuthenticationEnabled: updatedValue
    });


    return updatedValue;
  }

  async updateUserProfilePicture(userId: string, ppid: string) {
    const userDoc = await this.userRe.findById(userId);
    if (!userDoc) {
      throw new Error('User not found');
    }
    const updatePicture = await this.userRe.update(userId, { profilePicture: ppid })
    return updatePicture;
  }

  async updateUserData(userId: string, un: string, fn: string, ln: string) {
    const userDoc = await this.userRe.findById(userId);
    if (!userDoc) {
      throw new Error('User not found');
    }
    const parts = userDoc.username.split('#');
    if (parts.length !== 2) {
      throw new Error('Invalid username format');
    }
    console.log('parts', parts);
    const newUsername = `${un}#${parts[1]}`;

    const updateData = await this.userRe.update(userId, { username: newUsername, firstname: fn, lastname: ln });
    return updateData;
  }



  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRe.update(userId, {
      currentHashedRefreshToken
    });
  }

  async sendPasswordResetEmail(email: string) {
    const user = await this.userRe.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetUrl = `http://localhost:3000/auth/resetpw?token=${resetToken}&email=${email}`;
    const text = resetUrl;
    await this.userRe.update(user.id, { passResetToken: resetToken })
    await this.emailService.sendMail({
      to: email,
      subject: 'Password Reset',
      text,
    })
  }

  async getUserbyInstitution(institution: string): Promise<User[]> {
    const result = await this.userModel.find({ institution }).exec();
    if (!result || result.length === 0) {
      throw new NotFoundException(`user not found for ${institution}`);
    }
    return result;
  }

}




