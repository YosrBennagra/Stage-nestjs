import { Result } from 'src/Schema/Result.Schema';
import { ResultService } from 'src/uses-case/Result/result.service';
export declare class ResultController {
    private readonly resultService;
    constructor(resultService: ResultService);
    create(createResultDto: any): Promise<Result>;
    findAll(): Promise<Result[]>;
    findOne(id: string): Promise<Result>;
    update(id: string, updateResultDto: any): Promise<Result>;
    remove(id: string): Promise<Result>;
    calculateAndSaveResults(studentId: string): Promise<Result[]>;
    GetAssignmentResults(studentId: string, assignmentId: string): Promise<Result>;
}
