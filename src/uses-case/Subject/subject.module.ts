import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from 'src/Schema/Subject.Schema';
import { SubjectController } from 'src/Controllers/subject.controller';
import { SubjectService } from './subject.service';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  providers: [SubjectService],
  controllers: [SubjectController],
})
export class SubjectModule {}
