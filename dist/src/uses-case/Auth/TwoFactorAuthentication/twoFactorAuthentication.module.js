"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorAuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_module_1 = require("../../User/user.module");
const twoFactorAuthentication_service_1 = require("./twoFactorAuthentication.service");
const twoFactorAuthentication_controller_1 = require("../../../Controllers/twoFactorAuthentication.controller");
const auth_service_1 = require("../auth.service");
let TwoFactorAuthenticationModule = class TwoFactorAuthenticationModule {
};
exports.TwoFactorAuthenticationModule = TwoFactorAuthenticationModule;
exports.TwoFactorAuthenticationModule = TwoFactorAuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            user_module_1.UserModule,
        ],
        providers: [
            twoFactorAuthentication_service_1.TwoFactorAuthenticationService,
            auth_service_1.AuthService
        ],
        controllers: [twoFactorAuthentication_controller_1.TwoFactorAuthenticationController],
    })
], TwoFactorAuthenticationModule);
//# sourceMappingURL=twoFactorAuthentication.module.js.map