import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from 'src/Schema/Result.Schema';
import { ResultService } from 'src/uses-case/Result/result.service';
import { ResultController } from 'src/Controllers/result.controller';
import { Answer, AnswerSchema } from 'src/Schema/Answer.Schema';
import { Question, QuestionSchema } from 'src/Schema/Question.Schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
        MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
        MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])
    ],
    providers: [ResultService],
    controllers: [ResultController],
    exports: [ResultService],
})
export class ResultModule { }
