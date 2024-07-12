import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { UserInfo } from 'src/Schema/UserInfo.Schema';
import { UserInfoService } from 'src/uses-case/UserInfo/userInfo.service';


@Controller('userinfos')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Public()
  @Post()
  async createLesson(@Body() createLessonDto: any): Promise<UserInfo> {
    return this.userInfoService.createUserInfo(createLessonDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<UserInfo[]> {
    return this.userInfoService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserInfo> {
    return this.userInfoService.findOne(id);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLessonDto: any): Promise<UserInfo> {
    return this.userInfoService.update(id, updateLessonDto);
  }

  @Public()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserInfo> {
    return this.userInfoService.delete(id);
  }

  @Public()
  @Get('/byuser/:groupId')
  async findByGroupId(@Param('groupId') groupId: string): Promise<UserInfo> {
    return this.userInfoService.findByGroupId(groupId);
  }
}
