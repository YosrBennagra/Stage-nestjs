/// <reference types="multer" />
/// <reference types="multer-gridfs-storage" />
import { Lesson } from 'src/Schema/Lesson.Schema';
import { LessonService } from 'src/uses-case/lesson/lesson.service';
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    createLesson(createLessonDto: any, files: Express.Multer.File[]): Promise<Lesson>;
    findAll(): Promise<Lesson[]>;
    findOne(id: string): Promise<Lesson>;
    update(id: string, updateLessonDto: any): Promise<Lesson>;
    delete(id: string): Promise<Lesson>;
    findByGroupId(groupId: string): Promise<Lesson[]>;
}
