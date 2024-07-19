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
exports.UserInfoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const UserInfo_Schema_1 = require("../../Schema/UserInfo.Schema");
let UserInfoService = class UserInfoService {
    constructor(UserInfoModel) {
        this.UserInfoModel = UserInfoModel;
    }
    async createUserInfo(createUserInfoDto) {
        const createUserInfoDtoo = new this.UserInfoModel({
            ...createUserInfoDto,
        });
        return createUserInfoDtoo.save();
    }
    async findAll() {
        return this.UserInfoModel.find();
    }
    async findOne(id) {
        return this.UserInfoModel.findById(id);
    }
    async update(id, updateUserInfoDto) {
        return this.UserInfoModel.findByIdAndUpdate(id, updateUserInfoDto, { new: true }).exec();
    }
    async delete(id) {
        return this.UserInfoModel.findByIdAndDelete(id).exec();
    }
    async findByGroupId(groupId) {
        return this.UserInfoModel.findOne({ user: groupId }).exec();
    }
    async findByIns(groupId) {
        return this.UserInfoModel.find({ institution: groupId }).populate('user').exec();
    }
};
exports.UserInfoService = UserInfoService;
exports.UserInfoService = UserInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(UserInfo_Schema_1.UserInfo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserInfoService);
//# sourceMappingURL=userInfo.service.js.map