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
exports.TwoFactorAuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const twoFactorAuthentication_service_1 = require("../uses-case/Auth/TwoFactorAuthentication/twoFactorAuthentication.service");
const public_decorator_1 = require("../Custom Decorators/public.decorator");
const user_service_1 = require("../uses-case/User/user.service");
const twoFactorAuthentificationCode_dto_1 = require("../uses-case/Auth/TwoFactorAuthentication/twoFactorAuthentificationCode.dto");
const auth_service_1 = require("../uses-case/Auth/auth.service");
let TwoFactorAuthenticationController = class TwoFactorAuthenticationController {
    constructor(twoFactorAuthenticationService, usersService, authService) {
        this.twoFactorAuthenticationService = twoFactorAuthenticationService;
        this.usersService = usersService;
        this.authService = authService;
    }
    async register(response, requestBody) {
        const { email, id } = requestBody;
        const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(email, id);
        response.setHeader("content-type", "image/png");
        return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
    }
    async authenticate({ twoFactorAuthenticationCode }, fasecret) {
        const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, fasecret);
        if (!isCodeValid) {
            throw new common_1.UnauthorizedException('Wrong authentication code');
        }
        return { isAuthenticated: true };
    }
    async turnOnTwoFactorAuthentication(requestBody) {
        const { id } = requestBody;
        return this.usersService.turnOnTwoFactorAuthentication(id);
    }
};
exports.TwoFactorAuthenticationController = TwoFactorAuthenticationController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TwoFactorAuthenticationController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('authenticate'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)('fasecret')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [twoFactorAuthentificationCode_dto_1.default, String]),
    __metadata("design:returntype", Promise)
], TwoFactorAuthenticationController.prototype, "authenticate", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('turn-on-off'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TwoFactorAuthenticationController.prototype, "turnOnTwoFactorAuthentication", null);
exports.TwoFactorAuthenticationController = TwoFactorAuthenticationController = __decorate([
    (0, common_1.Controller)('2fa'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [twoFactorAuthentication_service_1.TwoFactorAuthenticationService,
        user_service_1.UserService,
        auth_service_1.AuthService])
], TwoFactorAuthenticationController);
//# sourceMappingURL=twoFactorAuthentication.controller.js.map