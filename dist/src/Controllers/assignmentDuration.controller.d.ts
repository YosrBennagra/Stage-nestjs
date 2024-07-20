import { AssignmentDuration } from 'src/Schema/AssignmentDuration.Schema';
import { AssignmentDurationService } from 'src/uses-case/AssignmentDuration/AssignmentDuration.service';
export declare class AssignmentDurationController {
    private readonly assignmentDurationService;
    constructor(assignmentDurationService: AssignmentDurationService);
    create(createAssignmentDurationDto: {
        user: string;
        assignment: string;
    }): Promise<AssignmentDuration>;
    findAll(): Promise<AssignmentDuration[]>;
    findOne(id: string): Promise<AssignmentDuration>;
    update(id: string, duration: number): Promise<AssignmentDuration>;
    remove(id: string): Promise<AssignmentDuration>;
    getRemainingDuration(assignmentId: string, userId: string): Promise<{
        remainingDuration: number;
    }>;
}
