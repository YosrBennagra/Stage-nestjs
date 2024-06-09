"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const GridFsMulterConfigService_1 = require("../../Config/multer/GridFsMulterConfigService");
const file_service_1 = require("./file.service");
const file_controller_1 = require("../../Controllers/file.controller");
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                useClass: GridFsMulterConfigService_1.GridFsMulterConfigService,
            }),
        ],
        controllers: [file_controller_1.FileController],
        providers: [GridFsMulterConfigService_1.GridFsMulterConfigService, file_service_1.FileService],
    })
], FilesModule);
//# sourceMappingURL=file.module.js.map