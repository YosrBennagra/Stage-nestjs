import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { Question } from 'src/Schema/Question.Schema';
import { QuestionService } from 'src/uses-case/Question/question.service';


@Controller('questions')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }
    @Public()
    @Post()
    async create(@Body() createQuestionDto: any): Promise<Question> {
        return this.questionService.create(createQuestionDto);
    }

    @Public()
    @Get()
    async findAll(): Promise<Question[]> {
        return this.questionService.findAll();
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Question> {
        const question = await this.questionService.findOne(id);
        if (!question) {
            throw new NotFoundException(`Question #${id} not found`);
        }
        return question;
    }

    @Public()
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateQuestionDto: any): Promise<Question> {
        const question = await this.questionService.update(id, updateQuestionDto);
        if (!question) {
            throw new NotFoundException(`Question #${id} not found`);
        }
        return question;
    }

    @Public()
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Question> {
        const question = await this.questionService.remove(id);
        if (!question) {
            throw new NotFoundException(`Question #${id} not found`);
        }
        return question;
    }
    
    @Public()
    @Get('assignment/:assignmentId')
    async findByAssignmentId(@Param('assignmentId') assignmentId: string): Promise<Question[]> {
      return this.questionService.findByAssignmentId(assignmentId);
    }
}
