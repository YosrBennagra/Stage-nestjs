import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Classroom, ClassroomSchema } from 'src/Schema/Classroom.Schema';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from 'src/Controllers/classroom.controller';





@Module({
  imports: [
    MongooseModule.forFeature([{ name: Classroom.name, schema: ClassroomSchema }]),
  ],
  providers: [ClassroomService],
  controllers: [ClassroomController],
})
export class ClassroomModule {}
