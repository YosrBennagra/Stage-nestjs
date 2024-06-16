import { Question } from 'src/Schema/Question.Schema';
import { QuestionService } from 'src/uses-case/Question/question.service';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(createQuestionDto: any): Promise<Question>;
    findAll(): Promise<Question[]>;
    findOne(id: string): Promise<Question>;
    update(id: string, updateQuestionDto: any): Promise<Question>;
    remove(id: string): Promise<Question>;
    findByAssignmentId(assignmentId: string): Promise<Question[]>;
}
