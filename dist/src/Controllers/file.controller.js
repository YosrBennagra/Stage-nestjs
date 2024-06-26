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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../Custom Decorators/public.decorator");
const file_service_1 = require("../uses-case/FileUpload/file.service");
const FileResponseVm_1 = require("../uses-case/FileUpload/model/FileResponseVm ");
let FileController = class FileController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    upload(files) {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                id: file.id,
                filename: file.filename,
                metadata: file.metadata,
                bucketName: file.bucketName,
                chunkSize: file.chunkSize,
                size: file.size,
                md5: file.md5,
                uploadDate: file.uploadDate,
                contentType: file.contentType,
                url: "http://localhost:3001/attachment/files/" + file.id
            };
            response.push(fileReponse);
        });
        return response;
    }
    async getFileInfo(id) {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.readStream(id);
        if (!filestream) {
            throw new common_1.HttpException('An error occurred while retrieving file info', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        return {
            message: 'File has been detected',
            file: file
        };
    }
    async getFile(id, res) {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.readStream(id);
        if (!filestream) {
            throw new common_1.HttpException('An error occurred while retrieving file', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res);
    }
    async downloadFile(id, res) {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.readStream(id);
        if (!filestream) {
            throw new common_1.HttpException('An error occurred while retrieving file', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        res.header('Content-Type', file.contentType);
        res.header('Content-Disposition', 'attachment; filename=' + file.filename);
        return filestream.pipe(res);
    }
    async deleteFile(id) {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.deleteFile(id);
        if (!filestream) {
            throw new common_1.HttpException('An error occurred during file deletion', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        return {
            message: 'File has been deleted',
            file: file
        };
    }
};
exports.FileController = FileController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(''),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file')),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "upload", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('info/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFileInfo", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFile", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('download/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "downloadFile", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('delete/:id'),
    (0, swagger_1.ApiCreatedResponse)({ type: FileResponseVm_1.FileResponseVm }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteFile", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('/attachment/files'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
//# sourceMappingURL=file.controller.js.map