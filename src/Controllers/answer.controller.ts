import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { Public } from 'src/Custom Decorators/public.decorator';
import { Answer } from 'src/Schema/Answer.Schema';
import { AnswerService } from 'src/uses-case/Answer/answer.service';


@Controller('answers')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) { }
    @Public()
    @Post()
    async create(@Body() createAnswerDto: any): Promise<Answer> {
        return this.answerService.create(createAnswerDto);
    }

    @Public()
    @Get()
    async findAll(): Promise<Answer[]> {
        return this.answerService.findAll();
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Answer> {
        const answer = await this.answerService.findOne(id);
        if (!answer) {
            throw new NotFoundException(`answer #${id} not found`);
        }
        return answer;
    }

    @Public()
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAnswerDto: any): Promise<Answer> {
        const answer = await this.answerService.update(id, updateAnswerDto);
        if (!answer) {
            throw new NotFoundException(`answer #${id} not found`);
        }
        return answer;
    }

    @Public()
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Answer> {
        const answer = await this.answerService.remove(id);
        if (!answer) {
            throw new NotFoundException(`answer #${id} not found`);
        }
        return answer;
    }
    

}
