import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Institution, InstitutionSchema } from 'src/Schema/Institution.Schema';
import { InstitutionService } from './institution.service';
import { InstitutionController } from 'src/Controllers/institution.controller';
import { User, UserSchema } from 'src/Schema/User.Schema';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [InstitutionService],
  controllers: [InstitutionController],
})
export class InstitutionModule {}
