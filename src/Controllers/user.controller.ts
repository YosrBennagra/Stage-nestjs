import mongoose from "mongoose";
import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { User } from "../Schema/User.Schema";
import { UserRepository, UserService } from "../uses-case/User";
import { CreatUserDto } from "../uses-case/User/DTO/CreatUser.dto";
import { Public } from "src/Custom Decorators/public.decorator";
import * as bcrypt from 'bcrypt';


@Controller('users')
export class UsersController {

  constructor(
    private usersService: UserService,
    private userRe: UserRepository
  ) { }
  @Public()
  @Post('signup')
  async createUser(@Body() createUserDto: CreatUserDto) {
    try {
      const newUser = await this.usersService.CreatUser(createUserDto);
      return newUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Public()
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Public()
  @Delete('deleteuser/:id')
  async DeleteUser(@Param('id') id: string) {
    console.log("🚀 ~ file: user.controller.ts:37 ~ UsersController ~ DeleteUser ~ id:", id);
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('invalide ID', 400);
    const deleteuser = await this.usersService.deleteUser(id);
    if (!deleteuser) throw new HttpException('user not found', 404);
    return deleteuser;
  }


  @Public()
  @Get(':id')
  async GetUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('user not found', 404);
    const findUser = await this.usersService.findOneUser(id);
    if (!findUser) {
      throw new HttpException('user not found', 404);
    }
    return findUser;
  }

  @Public()
  @Get('role/:role')
  async GetUserByRole(
    @Param('role') role: string,
    @Query('search') search: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0
  ) {
    const { users, count } = await this.usersService.findUserByRole(role, search, limit, offset);
    if (!users || users.length === 0) {
      throw new NotFoundException('Users not found');
    }
    return { users, count };
  }


  @Public()
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  @Public()
  @Get('status/not-confirmed')
  async getUsersByStatusNotConfirmed(
    @Query('search') search: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0
  ) {
    try {
      const { users, count } = await this.usersService.findUsersByStatusNotConfirmed(search, limit, offset);
      if (!users || users.length === 0) {
        throw new NotFoundException('Users not found');
      }
      return { users, count };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('/update/:id')
  async UpdateUser(
    @Body() creatUserDto: CreatUserDto,
    @Param('id') id: string,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updateUser = await this.usersService.UpdateUser(id, creatUserDto);
    if (!updateUser) throw new HttpException('user not found', 404);
    return updateUser;
  }
  @Public()
  @Post('reset-password')
  async resetPassword(@Body() { email, resetToken, password }: { email: string; resetToken: string; password: string }) {
    console.log("email", email);
    console.log("newpassword", password);
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    console.log("user.passResetToken", user.passResetToken);
    console.log("resetToken", resetToken);

    if (user.passResetToken !== resetToken) {
      throw new Error('Invalid reset token');
    }
    const hashedPassword = await this.hashPassword(password)
    await this.userRe.update(user.id, { passResetToken: resetToken, password: hashedPassword })

    return { message: 'Password reset successful' };
  }

  async hashPassword(password: string) {
    console.log("Password:", password);
    const saltOrRounds = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const isMatch = await bcrypt.compare(password, hash);
    console.log('isMatch:', isMatch)
    return await bcrypt.hash(password, saltOrRounds);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.usersService.sendPasswordResetEmail(email);
    return { message: 'Password reset email sent' };
  }

  @Public()
  @Post('update-profile-picture')
  async updateProfilePicture(@Body() requestBody: { userId: string, profilePictureId: string }) {
    const { userId, profilePictureId } = requestBody;
    try {
      const updatedUser = await this.usersService.updateUserProfilePicture(userId, profilePictureId);
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Public()
  @Post('update-user')
  async updateDataUser(@Body() requestBody: { userId: string, un: string, fn: string, ln: string }) {
    const { userId, un, fn, ln } = requestBody;
    try {
      const updatedUser = await this.usersService.updateUserData(userId, un, fn, ln);
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Public()
  @Get('/institutions/:id')
  async GetAssignmentResults(
    @Param('id') id: string,
  ): Promise<User[]> {
    try {
      return await this.usersService.getUserbyInstitution(
        id,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Public()
  @Patch(':id/accept')
  async acceptUser(@Param('id') id: string) {
    const user = await this.usersService.AcceptStudent(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

}
