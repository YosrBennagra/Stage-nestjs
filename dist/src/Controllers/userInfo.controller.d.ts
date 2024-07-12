import { UserInfo } from 'src/Schema/UserInfo.Schema';
import { UserInfoService } from 'src/uses-case/UserInfo/userInfo.service';
export declare class UserInfoController {
    private readonly userInfoService;
    constructor(userInfoService: UserInfoService);
    createLesson(createLessonDto: any): Promise<UserInfo>;
    findAll(): Promise<UserInfo[]>;
    findOne(id: string): Promise<UserInfo>;
    update(id: string, updateLessonDto: any): Promise<UserInfo>;
    delete(id: string): Promise<UserInfo>;
    findByGroupId(groupId: string): Promise<UserInfo>;
}
