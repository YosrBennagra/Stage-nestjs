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
exports.EmailConfirmationController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../Custom Decorators/public.decorator");
const confirmEmail_dto_1 = require("../uses-case/Auth/EmailConfirmation/confirmEmail.dto");
const emailConfirmation_service_1 = require("../uses-case/Auth/EmailConfirmation/emailConfirmation.service");
let EmailConfirmationController = class EmailConfirmationController {
    constructor(emailConfirmationService) {
        this.emailConfirmationService = emailConfirmationService;
    }
    async confirm(confirmationData) {
        const email = await this.emailConfirmationService.decodeConfirmationToken(confirmationData.token);
        await this.emailConfirmationService.confirmEmail(email);
    }
    async resendConfirmationLink(body) {
        const { email } = body;
        await this.emailConfirmationService.resendConfirmationLink(email);
    }
};
exports.EmailConfirmationController = EmailConfirmationController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirmEmail_dto_1.default]),
    __metadata("design:returntype", Promise)
], EmailConfirmationController.prototype, "confirm", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('resend-confirmation-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailConfirmationController.prototype, "resendConfirmationLink", null);
exports.EmailConfirmationController = EmailConfirmationController = __decorate([
    (0, common_1.Controller)('email-confirmation'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [emailConfirmation_service_1.EmailConfirmationService])
], EmailConfirmationController);
//# sourceMappingURL=emailConfirmation.controller.js.map