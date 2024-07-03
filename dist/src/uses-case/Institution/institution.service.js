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
    constructor(institutionModel, userModel) {
        this.institutionModel = institutionModel;
        this.userModel = userModel;
    }
    async create(createInstitutionDto) {
        const createdInstitution = new this.institutionModel({
            ...createInstitutionDto,
        });
        return createdInstitution.save();
    }
    async findAll() {
        return this.institutionModel.find().populate('responsables').exec();
    }
    async findOne(id) {
        return (await (await this.institutionModel.findById(id)).populate('responsables'));
    }
    async update(id, updateInstitutionDto) {
        return this.institutionModel.findByIdAndUpdate(id, updateInstitutionDto, { new: true }).exec();
    }
    async delete(id) {
        return this.institutionModel.findByIdAndDelete(id).exec();
    }
    async addResponsable(responsablesId, id) {
        console.log('addResponsable', responsablesId, id);
        const user = await this.userModel.findByIdAndUpdate(id, { institution: responsablesId }, { new: true }).exec();
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        return this.institutionModel.findByIdAndUpdate(responsablesId, { $addToSet: { responsables: id } }, { new: true }).exec();
    }
    async removeResponsable(responsablesId, id) {
        return this.institutionModel.findByIdAndUpdate(responsablesId, { $pull: { responsables: id } }, { new: true }).exec();
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