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
    addAssignedTo(id: string, userId: string): Promise<any>;
}
