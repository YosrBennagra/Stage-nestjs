import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { Salary } from 'src/Schema/Salary.Schema';
import { SalaryService } from 'src/uses-case/Salary/salary.service';

@Controller('salary')
export class SalaryController {
    constructor(private readonly salaryService: SalaryService) { }
    @Public()
    @Put(':teacherId')
    async updateSalary(
        @Param('teacherId') teacherId: string,
        @Body() updates: Partial<Salary>
    ): Promise<void> {
        await this.salaryService.createOrUpdateSalary(teacherId, updates);
    }

    @Public()
    @Get()
    async getSalary(): Promise<Salary[]> {
        return this.salaryService.getSalary();
    }
}
