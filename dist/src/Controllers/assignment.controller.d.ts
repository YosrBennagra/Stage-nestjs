import { Assignment } from 'src/Schema/Assignment.Schema';
import { AssignmentService } from 'src/uses-case/Assignment/assignment.service';
export declare class AssignmentController {
    private readonly assignmentService;
    constructor(assignmentService: AssignmentService);
    create(createAssignmentDto: any): Promise<Assignment>;
    findAll(): Promise<Assignment[]>;
    findOne(id: string): Promise<Assignment>;
    update(id: string, updateAssignmentDto: any): Promise<Assignment>;
    remove(id: string): Promise<Assignment>;
    addUser(assignmentId: string, id: string): Promise<Assignment>;
    removeUser(assignmentId: string, id: string): Promise<Assignment>;
    addGroup(assignmentId: string, id: string): Promise<Assignment>;
    removeGroup(assignmentId: string, id: string): Promise<Assignment>;
    updateAssignedUsers(assignmentId: string, userIdsToAdd: string[]): Promise<any>;
    updateAssignedGroups(assignmentId: string, groupIdsToAdd: string[]): Promise<any>;
    updatePasseduser(assignmentId: string, id: string): Promise<any>;
}
