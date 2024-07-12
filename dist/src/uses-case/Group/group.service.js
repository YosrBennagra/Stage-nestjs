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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Group_Schema_1 = require("../../Schema/Group.Schema");
const User_Schema_1 = require("../../Schema/User.Schema");
let GroupService = class GroupService {
    constructor(groupModel, userModel) {
        this.groupModel = groupModel;
        this.userModel = userModel;
    }
    async create(createGroupDto) {
        const createdGroup = new this.groupModel({
            ...createGroupDto,
            color: getRandomHexColor(),
        });
        return createdGroup.save();
    }
    async getGroupsByUserId(userId) {
        const groups = await this.groupModel.find({ users: userId }).populate('users').populate('subject').exec();
        if (!groups) {
            throw new common_1.NotFoundException('No groups found for this user');
        }
        return groups;
    }
    async findAll() {
        return this.groupModel.find().populate('users').exec();
    }
    async findOne(id) {
        return (await this.groupModel.findById(id)).populate('users');
    }
    async update(id, updateGroupDto) {
        return this.groupModel.findByIdAndUpdate(id, updateGroupDto, { new: true }).exec();
    }
    async delete(id) {
        return this.groupModel.findByIdAndDelete(id).exec();
    }
    async addUser(groupId, id) {
        return this.groupModel.findByIdAndUpdate(groupId, { $push: { users: id } }, { new: true }).exec();
    }
    async removeUser(groupId, id) {
        return this.groupModel.findByIdAndUpdate(groupId, { $pull: { users: id } }, { new: true }).exec();
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Group_Schema_1.Group.name)),
    __param(1, (0, mongoose_1.InjectModel)(User_Schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], GroupService);
function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
}
//# sourceMappingURL=group.service.js.map