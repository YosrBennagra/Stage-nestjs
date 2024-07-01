import { Subject } from 'src/Schema/Subject.Schema';
import { SubjectService } from 'src/uses-case/Subject/subject.service';
export declare class SubjectController {
    private readonly subjectService;
    constructor(subjectService: SubjectService);
    create(createSubjectDto: any): Promise<Subject>;
    findAll(): Promise<Subject[]>;
    findOne(id: string): Promise<Subject>;
    update(id: string, updateSubjectDto: any): Promise<Subject>;
    delete(id: string): Promise<Subject>;
}
