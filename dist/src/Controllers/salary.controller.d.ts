import { SalaryService } from 'src/uses-case/Salary/salary.service';
export declare class SalaryController {
    private readonly salaryService;
    constructor(salaryService: SalaryService);
    fillSalariesForTeachers(): Promise<{
        message: string;
    }>;
}
