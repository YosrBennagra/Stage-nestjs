import { Group } from 'src/Schema/Group.Schema';
import { GroupService } from 'src/uses-case/Group/group.service';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(createGroupDto: any): Promise<Group>;
    findAll(): Promise<Group[]>;
    findOne(id: string): Promise<Group>;
    update(id: string, updateGroupDto: any): Promise<Group>;
    delete(id: string): Promise<Group>;
    addUser(groupId: string, id: string): Promise<Group>;
    removeUser(groupId: string, id: string): Promise<Group>;
}
