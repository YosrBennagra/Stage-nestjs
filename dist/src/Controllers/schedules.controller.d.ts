import { Schedules } from 'src/Schema/Schedules.Schema';
import { SchedulesService } from 'src/uses-case/Schedule/schedules.service';
export declare class SchedulesController {
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    getSchedule(classId: string): Promise<Schedules[]>;
    findAll(): Promise<Schedules[]>;
    getScheduleByClassId(classId: string): Promise<Schedules[]>;
    createOrUpdateSchedule(classId: string, scheduleData: any): Promise<Schedules[]>;
    removeScheduleEntry(scheduleId: string): Promise<void>;
}
