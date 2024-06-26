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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const base_abstract_repository_1 = require("../../../repositories/Base/base.abstract.repository");
const User_Schema_1 = require("../../../Schema/User.Schema");
let UserRepository = class UserRepository extends base_abstract_repository_1.BaseAbstractRepository {
    constructor(userModel) {
        super(userModel);
        this.userModel = userModel;
    }
    async findByEmail(email) {
        return this.findOne({ email });
    }
    async findUserWithNumber(usernameWithNumber) {
        const user = await this.userModel.findOne({ username: usernameWithNumber });
        return !!user;
    }
    async findUnconfirmedUsers() {
        return await this.find({ where: { isEmailConfirmed: false } });
    }
    async findAll(params) {
        return this.userModel.find(params).exec();
    }
    async findByRole(role, search, limit, offset) {
        const query = this.userModel.find({ Role: role });
        if (search) {
            query.or([
                { username: new RegExp(search, 'i') },
                { email: new RegExp(search, 'i') }
            ]);
        }
        const users = await query.skip(offset).limit(limit).exec();
        const count = await this.userModel.countDocuments(query.getQuery());
        return { users, count };
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(User_Schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserRepository);
//# sourceMappingURL=user.repository.js.map