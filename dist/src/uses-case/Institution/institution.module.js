"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Institution_Schema_1 = require("../../Schema/Institution.Schema");
const institution_service_1 = require("./institution.service");
const institution_controller_1 = require("../../Controllers/institution.controller");
const User_Schema_1 = require("../../Schema/User.Schema");
let InstitutionModule = class InstitutionModule {
};
exports.InstitutionModule = InstitutionModule;
exports.InstitutionModule = InstitutionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: Institution_Schema_1.Institution.name, schema: Institution_Schema_1.InstitutionSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: User_Schema_1.User.name, schema: User_Schema_1.UserSchema }]),
        ],
        providers: [institution_service_1.InstitutionService],
        controllers: [institution_controller_1.InstitutionController],
    })
], InstitutionModule);
//# sourceMappingURL=institution.module.js.map