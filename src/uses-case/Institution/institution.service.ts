import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Institution } from 'src/Schema/Institution.Schema';
import { User } from 'src/Schema/User.Schema';



@Injectable()
export class InstitutionService {
    constructor(@InjectModel(Institution.name) private institutionModel: Model<Institution>,
        @InjectModel(User.name) private userModel: Model<User>) { }

    async create(createInstitutionDto: any): Promise<Institution> {
        const createdInstitution = new this.institutionModel({
            ...createInstitutionDto,

        });
        return createdInstitution.save();
    }
    async findAll(): Promise<Institution[]> {
        return this.institutionModel.find().populate('responsables').exec();
    }

    async findOne(id: string): Promise<Institution> {
        return (await (await this.institutionModel.findById(id)).populate('responsables'));
    }

    async update(id: string, updateInstitutionDto: any): Promise<Institution> {
        return this.institutionModel.findByIdAndUpdate(id, updateInstitutionDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Institution> {
        return this.institutionModel.findByIdAndDelete(id).exec();
    }

    async addResponsable(responsablesId: string, id: string): Promise<Institution> {
        console.log('addResponsable', responsablesId, id);
        const user = await this.userModel.findByIdAndUpdate(id, { institution: responsablesId  }, { new: true }).exec();
        if (!user) {
          throw new BadRequestException('User not found');
        }

        return this.institutionModel.findByIdAndUpdate(responsablesId, { $addToSet: { responsables: id } }, { new: true }).exec();
      }

      async removeResponsable(responsablesId: string, id: string): Promise<Institution> {
        return this.institutionModel.findByIdAndUpdate(responsablesId, { $pull: { responsables: id } }, { new: true }).exec();
      }
}
