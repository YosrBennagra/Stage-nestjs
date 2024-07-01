import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Institution } from 'src/Schema/Institution.Schema';
import { User } from 'src/Schema/User.Schema';



@Injectable()
export class InstitutionService {
    constructor(@InjectModel(Institution.name) private institutionModel: Model<Institution>,
        @InjectModel(User.name) private UserModel: Model<User>) { }

    async create(createInstitutionDto: any): Promise<Institution> {
        const { responsables } = createInstitutionDto;

        if (responsables && responsables.length > 0) {
            for (const responsableId of responsables) {
                const user = await this.UserModel.findById(responsableId).exec();
                if (user && user.institution) {
                    throw new BadRequestException(`User ${responsableId} already belongs to another institution`);
                }
            }
        }
        const createdInstitution = new this.institutionModel({
            ...createInstitutionDto,
        });

        if (responsables) {
            for (const responsableId of responsables) {
                await this.UserModel.findByIdAndUpdate(responsableId, { institution: createdInstitution._id }).exec();
            }
        }

        return createdInstitution.save();
    }



    async findAll(): Promise<Institution[]> {
        return this.institutionModel.find().exec();
    }

    async findOne(id: string): Promise<Institution> {
        return (await this.institutionModel.findById(id).exec());
    }

    async update(id: string, updateInstitutionDto: any): Promise<Institution> {
        return this.institutionModel.findByIdAndUpdate(id, updateInstitutionDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Institution> {
        return this.institutionModel.findByIdAndDelete(id).exec();
    }
}
