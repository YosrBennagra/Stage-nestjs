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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const User_1 = require("../User");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signIn(email, pass) {
        const user = (await this.userService.findUserByEmail(email));
        const isMatch = await bcrypt.compare(pass, user?.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const payload = { sub: user.id, username: user.username, email: user.email };
        console.log("od:", user.id, user.username, user.email);
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: user,
            userId: user.id,
            useremail: user.email,
            username: user.username,
            faSecret: user.twoFactorAuthenticationSecret,
            isTwoFactorAuthenticationEnabled: user.isTwoFactorAuthenticationEnabled,
            isEmailConfirmed: user.isEmailConfirmed,
            profilePicture: user.profilePicture,
            role: user.Role,
            institution: user.institution.toString(),
        };
    }
    getCookieWithJwtAccessToken(userId, isSecondFactorAuthenticated = false) {
        const payload = { userId, isSecondFactorAuthenticated };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
        });
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
    }
    getCookieWithJwtRefreshToken(userId) {
        const payload = {
            userId,
            isSecondFactorAuthenticated: false
        };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
        });
        const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
        return {
            cookie,
            token
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [User_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map