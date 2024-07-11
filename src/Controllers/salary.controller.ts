import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { SalaryService } from 'src/uses-case/Salary/salary.service';

@Controller('salary')
export class SalaryController {
    constructor(private readonly salaryService: SalaryService) { }
    @Public()
    @Get('fill-teachers')
    async fillSalariesForTeachers() {
        await this.salaryService.FillTeachers();
        return { message: 'Salaries filled for teachers successfully.' };
    }
}
