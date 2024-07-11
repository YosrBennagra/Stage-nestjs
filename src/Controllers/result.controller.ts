
import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { Result } from 'src/Schema/Result.Schema';
import { ResultService } from 'src/uses-case/Result/result.service';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) { }

  @Public()
  @Post()
  async create(@Body() createResultDto: any): Promise<Result> {
    return this.resultService.create(createResultDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<Result[]> {
    return this.resultService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Result> {
    const result = await this.resultService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Result #${id} not found`);
    }
    return result;
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateResultDto: any): Promise<Result> {
    const result = await this.resultService.update(id, updateResultDto);
    if (!result) {
      throw new NotFoundException(`Result #${id} not found`);
    }
    return result;
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Result> {
    const result = await this.resultService.remove(id);
    if (!result) {
      throw new NotFoundException(`Result #${id} not found`);
    }
    return result;
  }

  @Public()
  @Get('/student/:studentId/calculate')
  async calculateAndSaveResults(@Param('studentId') studentId: string): Promise<Result[]> {
    return this.resultService.calculateAndSaveResults(studentId);
  }


  @Public()
  @Get('/student/:studentId/:assignmentId')
  async GetAssignmentResults(
    @Param('studentId') studentId: string,
    @Param('assignmentId') assignmentId: string,
  ): Promise<Result> {
    try {
      return await this.resultService.getResultByStudentAndAssignment(
        studentId,
        assignmentId,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Public()
  @Get('/student/:studentId')
  async GetAssignmentResultsByStudent(
    @Param('studentId') studentId: string,
  ): Promise<Result[]> {
    try {
      return await this.resultService.getResultByStudent(
        studentId,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

}
