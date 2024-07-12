import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { Group } from 'src/Schema/Group.Schema';
import { GroupService } from 'src/uses-case/Group/group.service';


@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @Public()
  @Post()
  async create(@Body() createGroupDto: any): Promise<Group> {
    return this.groupService.create(createGroupDto);
  }
  
  @Public()
  @Get()
  async findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGroupDto: any): Promise<Group> {
    return this.groupService.update(id, updateGroupDto);
  }

  @Public()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Group> {
    return this.groupService.delete(id);
  }

  @Public()
  @Put(':groupId/addUser/:id')
  async addUser(@Param('groupId') groupId: string, @Param('id') id: string): Promise<Group> {
    return this.groupService.addUser(groupId, id);
  }

  @Public()
  @Put(':groupId/removeUser/:id')
  async removeUser(@Param('groupId') groupId: string, @Param('id') id: string): Promise<Group> {
    return this.groupService.removeUser(groupId, id);
  }
  @Public()
  @Get('user/:userId')
  async getGroupsByUserId(@Param('userId') userId: string): Promise<Group[]> {
    return this.groupService.getGroupsByUserId(userId);
  }
}
