import { Classroom } from 'src/Schema/Classroom.Schema';
import { ClassroomService } from 'src/uses-case/Classroom/classroom.service';
export declare class ClassroomController {
    private readonly classroomService;
    constructor(classroomService: ClassroomService);
    create(createClassroomDto: any): Promise<Classroom>;
    findAll(page?: number, limit?: number, search?: string): Promise<{
        classrooms: Classroom[];
        total: number;
    }>;
    findOne(id: string): Promise<Classroom>;
    update(id: string, updateClassroomDto: any): Promise<Classroom>;
    delete(id: string): Promise<Classroom>;
}
