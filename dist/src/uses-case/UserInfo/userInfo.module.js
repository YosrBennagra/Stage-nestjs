"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const UserInfo_Schema_1 = require("../../Schema/UserInfo.Schema");
const userInfo_controller_1 = require("../../Controllers/userInfo.controller");
const userInfo_service_1 = require("./userInfo.service");
let UserInfoModule = class UserInfoModule {
};
exports.UserInfoModule = UserInfoModule;
exports.UserInfoModule = UserInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: UserInfo_Schema_1.UserInfo.name, schema: UserInfo_Schema_1.UserInfoSchema }]),
        ],
        providers: [userInfo_service_1.UserInfoService],
        controllers: [userInfo_controller_1.UserInfoController],
        exports: [userInfo_service_1.UserInfoService],
    })
], UserInfoModule);
//# sourceMappingURL=userInfo.module.js.map