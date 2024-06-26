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
exports.MailController = void 0;
const public_decorator_1 = require("../Custom Decorators/public.decorator");
const email_service_1 = require("../uses-case/email/email.service");
const common_1 = require("@nestjs/common");
const emailConfirmation_service_1 = require("../uses-case/Auth/EmailConfirmation/emailConfirmation.service");
let MailController = class MailController {
    constructor(emailConfirmationService, mailService) {
        this.emailConfirmationService = emailConfirmationService;
        this.mailService = mailService;
    }
    async sendMail(sendMailDto) {
        await this.mailService.sendMail({
            ...sendMailDto,
        });
        return 'Email sent successfully';
    }
};
exports.MailController = MailController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "sendMail", null);
exports.MailController = MailController = __decorate([
    (0, common_1.Controller)('p0?: { url: string; }p0: { url: string; }email'),
    __metadata("design:paramtypes", [emailConfirmation_service_1.EmailConfirmationService,
        email_service_1.default])
], MailController);
//# sourceMappingURL=mail.controller.js.map