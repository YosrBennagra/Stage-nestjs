"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenaiModule = void 0;
const common_1 = require("@nestjs/common");
const openai_controller_1 = require("../../Controllers/openai.controller");
const openai_service_1 = require("./openai.service");
const platform_express_1 = require("@nestjs/platform-express");
const file_module_1 = require("./file/file.module");
const file_util_1 = require("./file/file.util");
const multer_1 = require("multer");
let OpenaiModule = class OpenaiModule {
};
exports.OpenaiModule = OpenaiModule;
exports.OpenaiModule = OpenaiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                imports: [file_module_1.FileModule],
                useFactory: (fileUtil) => ({
                    fileFilter: fileUtil.imageFileFilter,
                    storage: (0, multer_1.diskStorage)({
                        destination: 'upload',
                        filename: fileUtil.editFileName,
                    }),
                }),
                inject: [file_util_1.FileUtil],
            }),
        ],
        controllers: [openai_controller_1.OpenaiController],
        providers: [openai_service_1.OpenaiService],
    })
], OpenaiModule);
//# sourceMappingURL=openai.module.js.map