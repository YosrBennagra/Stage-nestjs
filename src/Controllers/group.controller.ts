import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Group } from 'src/Schema/Group.Schema';
import { GroupService } from 'src/uses-case/Group/group.service';


@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Body() createGroupDto: any): Promise<Group> {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  async findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGroupDto: any): Promise<Group> {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Group> {
    return this.groupService.delete(id);
  }

  @Put(':groupId/addUser/:userId')
  async addUser(@Param('groupId') groupId: string, @Param('userId') userId: string): Promise<Group> {
    return this.groupService.addUser(groupId, userId);
  }
}
