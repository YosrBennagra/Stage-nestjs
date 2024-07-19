import { TimeSlotService } from 'src/uses-case/TimeSlot/timeSlot.service';
export declare class TimeSlotController {
    private readonly timeSlotService;
    constructor(timeSlotService: TimeSlotService);
    createTimeSlot(day: string, time: string, classId: string): Promise<import("../Schema/TimeSlot.Schema").TimeSlot>;
    getTimeSlotsByClassId(classId: string): Promise<import("../Schema/TimeSlot.Schema").TimeSlot[]>;
    deleteTimeSlot(id: string): Promise<import("../Schema/TimeSlot.Schema").TimeSlot>;
}
