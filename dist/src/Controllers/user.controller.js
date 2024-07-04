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
exports.UsersController = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const User_1 = require("../uses-case/User");
const CreatUser_dto_1 = require("../uses-case/User/DTO/CreatUser.dto");
const public_decorator_1 = require("../Custom Decorators/public.decorator");
const bcrypt = require("bcrypt");
let UsersController = class UsersController {
    constructor(usersService, userRe) {
        this.usersService = usersService;
        this.userRe = userRe;
    }
    async createUser(createUserDto) {
        try {
            const newUser = await this.usersService.CreatUser(createUserDto);
            return newUser;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.CONFLICT);
        }
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async DeleteUser(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('invalide ID', 400);
        const deleteuser = await this.usersService.deleteUser(id);
        if (!deleteuser)
            throw new common_1.HttpException('user not found', 404);
        return deleteuser;
    }
    async GetUserById(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('user not found', 404);
        const findUser = await this.usersService.findOneUser(id);
        if (!findUser) {
            throw new common_1.HttpException('user not found', 404);
        }
        return findUser;
    }
    async GetUserByRole(role, search, limit = 10, offset = 0) {
        const { users, count } = await this.usersService.findUserByRole(role, search, limit, offset);
        if (!users || users.length === 0) {
            throw new common_1.NotFoundException('Users not found');
        }
        return { users, count };
    }
    async getUserByEmail(email) {
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            throw new common_1.HttpException('User not found', 404);
        }
        return user;
    }
    async UpdateUser(creatUserDto, id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid ID', 400);
        const updateUser = await this.usersService.UpdateUser(id, creatUserDto);
        if (!updateUser)
            throw new common_1.HttpException('user not found', 404);
        return updateUser;
    }
    async resetPassword({ email, resetToken, password }) {
        console.log("email", email);
        console.log("newpassword", password);
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        console.log("user.passResetToken", user.passResetToken);
        console.log("resetToken", resetToken);
        if (user.passResetToken !== resetToken) {
            throw new Error('Invalid reset token');
        }
        const hashedPassword = await this.hashPassword(password);
        await this.userRe.update(user.id, { passResetToken: resetToken, password: hashedPassword });
        return { message: 'Password reset successful' };
    }
    async hashPassword(password) {
        console.log("Password:", password);
        const saltOrRounds = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const isMatch = await bcrypt.compare(password, hash);
        console.log('isMatch:', isMatch);
        return await bcrypt.hash(password, saltOrRounds);
    }
    async forgotPassword(email) {
        await this.usersService.sendPasswordResetEmail(email);
        return { message: 'Password reset email sent' };
    }
    async updateProfilePicture(requestBody) {
        const { userId, profilePictureId } = requestBody;
        try {
            const updatedUser = await this.usersService.updateUserProfilePicture(userId, profilePictureId);
            return { success: true, user: updatedUser };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async updateDataUser(requestBody) {
        const { userId, un, fn, ln } = requestBody;
        try {
            const updatedUser = await this.usersService.updateUserData(userId, un, fn, ln);
            return { success: true, user: updatedUser };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async GetAssignmentResults(id) {
        try {
            return await this.usersService.getUserbyInstitution(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatUser_dto_1.CreatUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Delete)('deleteuser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "DeleteUser", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "GetUserById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('role/:role'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "GetUserByRole", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserByEmail", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatUser_dto_1.CreatUserDto, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "UpdateUser", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resetPassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "forgotPassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('update-profile-picture'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfilePicture", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('update-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateDataUser", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/institutions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "GetAssignmentResults", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [User_1.UserService,
        User_1.UserRepository])
], UsersController);
//# sourceMappingURL=user.controller.js.map