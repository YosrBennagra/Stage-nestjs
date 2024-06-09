"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const email_service_1 = require("./email.service");
const mail_controller_1 = require("../../Controllers/mail.controller");
const emailConfirmation_service_1 = require("../Auth/EmailConfirmation/emailConfirmation.service");
const user_module_1 = require("../User/user.module");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, user_module_1.UserModule],
        controllers: [mail_controller_1.MailController],
        providers: [email_service_1.default, emailConfirmation_service_1.EmailConfirmationService],
        exports: [email_service_1.default]
    })
], EmailModule);
//# sourceMappingURL=email.module.js.map