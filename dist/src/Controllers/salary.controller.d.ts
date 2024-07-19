import { Salary } from 'src/Schema/Salary.Schema';
import { SalaryService } from 'src/uses-case/Salary/salary.service';
export declare class SalaryController {
    private readonly salaryService;
    constructor(salaryService: SalaryService);
    updateSalary(teacherId: string, updates: Partial<Salary>): Promise<void>;
    getSalary(): Promise<Salary[]>;
}
