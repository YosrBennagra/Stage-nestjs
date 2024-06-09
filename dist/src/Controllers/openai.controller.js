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
exports.OpenaiController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const public_decorator_1 = require("../Custom Decorators/public.decorator");
const openai_service_1 = require("../uses-case/chatgpt/openai.service");
let OpenaiController = class OpenaiController {
    constructor(openaiService) {
        this.openaiService = openaiService;
    }
    getPromptResponse(body) {
        return this.openaiService.getPromptResponse(body.prompt);
    }
    getPromoptResponseWithImages(images, body) {
        console.log("images:", images);
        return this.openaiService.getPromoptResponseWithImages(body.prompt, images);
    }
};
exports.OpenaiController = OpenaiController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("prompt"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OpenaiController.prototype, "getPromptResponse", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("images", 10)),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("prompt-with-image"),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], OpenaiController.prototype, "getPromoptResponseWithImages", null);
exports.OpenaiController = OpenaiController = __decorate([
    (0, common_1.Controller)('openai'),
    __metadata("design:paramtypes", [openai_service_1.OpenaiService])
], OpenaiController);
//# sourceMappingURL=openai.controller.js.map