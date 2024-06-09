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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const User_Schema_1 = require("../../Schema/User.Schema");
const user_repository_1 = require("./UserRepo/user.repository");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const email_service_1 = require("../email/email.service");
let UserService = class UserService {
    constructor(emailService, userRe, userModel) {
        this.emailService = emailService;
        this.userRe = userRe;
        this.userModel = userModel;
    }
    async CreatUser({ ...creatUserDto }) {
        let randomNumber;
        let usernameWithNumber;
        let userExists;
        const existingUser = await this.userRe.findOne({ email: creatUserDto.email });
        if (existingUser) {
            throw new Error("There is already an account with this email.");
        }
        do {
            randomNumber = Math.floor(Math.random() * 10000);
            const paddedNumber = randomNumber.toString().padStart(4, '0');
            usernameWithNumber = `${creatUserDto.username}#${paddedNumber}`;
            userExists = await this.userRe.findUserWithNumber(usernameWithNumber);
        } while (userExists);
        const saltOrRounds = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
        const password = creatUserDto.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const isMatch = await bcrypt.compare(creatUserDto.password, hash);
        const newuser = new this.userModel({
            ...creatUserDto,
            password: hash,
            username: usernameWithNumber,
            isEmailConfirmed: false,
            isTwoFactorAuthenticationEnabled: false,
            twoFactorAuthenticationSecret: '',
            passResetToken: '',
            profilePicture: '660036990442903a5ff041ff'
        });
        const savedUser = await newuser.save();
        await savedUser.save();
        console.log("Hash: ", hash);
        console.log("Are The Password and the hash are matched? : ", isMatch);
        console.log("The New User: ", newuser);
        return savedUser;
    }
    async loginUser(loginDto) {
        const user = await this.userRe.findOne({ email: loginDto.email });
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Mot de passe incorrect");
        }
        return user;
    }
    deleteUser(id) {
        return this.userRe.delete(id);
    }
    findAllUser() {
        return this.userRe.findAll();
    }
    findOneUser(id) {
        return this.userRe.findById(id);
    }
    findUserByEmail(email) {
        return this.userRe.findByEmail(email);
    }
    UpdateUser(id, creatuserdto) {
        return this.userRe.update(id, creatuserdto);
    }
    UpdateUser2(id, firstname, lastname) {
        return this.userRe.updateUserFirstnameAndLastname(id, firstname, lastname);
    }
    async markEmailAsConfirmed(id) {
        return this.userRe.update(id, {
            isEmailConfirmed: true
        });
    }
    async deleteUnconfirmedUsers() {
        try {
            const deletedUsers = await this.userModel.deleteMany({ isEmailConfirmed: false });
            if (deletedUsers.deletedCount > 0) {
                console.log(`${deletedUsers.deletedCount} user(s) were deleted.`);
                console.log('Deleted users:', deletedUsers);
            }
        }
        catch (error) {
            console.error('Error deleting unconfirmed users:', error);
        }
    }
    async deleteUserProfile(userId) {
        try {
            const deletedUser = await this.userModel.deleteOne({ userId: userId });
            console.log('Deleted one user:', deletedUser);
        }
        catch (error) {
            console.error('Error deleting user:', error);
        }
    }
    async setTwoFactorAuthenticationSecret(secret, userId) {
        return this.userRe.update(userId, {
            twoFactorAuthenticationSecret: secret
        });
    }
    async turnOnTwoFactorAuthentication(userId) {
        const userDoc = await this.userRe.findById(userId);
        if (!userDoc) {
            throw new Error('User not found');
        }
        const updatedValue = !userDoc.isTwoFactorAuthenticationEnabled;
        await this.userRe.update(userId, {
            isTwoFactorAuthenticationEnabled: updatedValue
        });
        return updatedValue;
    }
    async updateUserProfilePicture(userId, ppid) {
        const userDoc = await this.userRe.findById(userId);
        if (!userDoc) {
            throw new Error('User not found');
        }
        const updatePicture = await this.userRe.update(userId, { profilePicture: ppid });
        return updatePicture;
    }
    async updateUserData(userId, un, fn, ln) {
        const userDoc = await this.userRe.findById(userId);
        if (!userDoc) {
            throw new Error('User not found');
        }
        const parts = userDoc.username.split('#');
        if (parts.length !== 2) {
            throw new Error('Invalid username format');
        }
        console.log('parts', parts);
        const newUsername = `${un}#${parts[1]}`;
        const updateData = await this.userRe.update(userId, { username: newUsername, firstname: fn, lastname: ln });
        return updateData;
    }
    async setCurrentRefreshToken(refreshToken, userId) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRe.update(userId, {
            currentHashedRefreshToken
        });
    }
    async sendPasswordResetEmail(email) {
        const user = await this.userRe.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetUrl = `http://localhost:3000/auth/resetpw?token=${resetToken}&email=${email}`;
        const text = resetUrl;
        await this.userRe.update(user.id, { passResetToken: resetToken });
        await this.emailService.sendMail({
            to: email,
            subject: 'Password Reset',
            text,
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_2.InjectModel)(User_Schema_1.User.name)),
    __metadata("design:paramtypes", [email_service_1.default,
        user_repository_1.UserRepository, mongoose_1.Model])
], UserService);
//# sourceMappingURL=user.service.js.map