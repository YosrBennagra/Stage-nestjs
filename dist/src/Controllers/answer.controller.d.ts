import { Answer } from 'src/Schema/Answer.Schema';
import { AnswerService } from 'src/uses-case/Answer/answer.service';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    create(createAnswerDto: any): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findOne(id: string): Promise<Answer>;
    update(id: string, studentid: string, updateAnswerDto: any): Promise<Answer>;
    remove(id: string): Promise<Answer>;
}
