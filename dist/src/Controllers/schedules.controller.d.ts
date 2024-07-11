import { Schedules } from 'src/Schema/Schedules.Schema';
import { SchedulesService } from 'src/uses-case/Schedule/schedules.service';
export declare class SchedulesController {
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    getSchedule(classId: string): Promise<Schedules>;
    findAll(): Promise<Schedules[]>;
    createSchedule(classId: string, createScheduleDto: any): Promise<Schedules>;
}
