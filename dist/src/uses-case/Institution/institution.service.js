"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Institution_Schema_1 = require("../../Schema/Institution.Schema");
const User_Schema_1 = require("../../Schema/User.Schema");
let InstitutionService = class InstitutionService {
    constructor(institutionModel, UserModel) {
        this.institutionModel = institutionModel;
        this.UserModel = UserModel;
    }
    async create(createInstitutionDto) {
        const { responsables } = createInstitutionDto;
        if (responsables && responsables.length > 0) {
            for (const responsableId of responsables) {
                const user = await this.UserModel.findById(responsableId).exec();
                if (user && user.institution) {
                    throw new common_1.BadRequestException(`User ${responsableId} already belongs to another institution`);
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
    async findAll() {
        return this.institutionModel.find().exec();
    }
    async findOne(id) {
        return (await this.institutionModel.findById(id).exec());
    }
    async update(id, updateInstitutionDto) {
        return this.institutionModel.findByIdAndUpdate(id, updateInstitutionDto, { new: true }).exec();
    }
    async delete(id) {
        return this.institutionModel.findByIdAndDelete(id).exec();
    }
};
exports.InstitutionService = InstitutionService;
exports.InstitutionService = InstitutionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Institution_Schema_1.Institution.name)),
    __param(1, (0, mongoose_1.InjectModel)(User_Schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], InstitutionService);
//# sourceMappingURL=institution.service.js.map