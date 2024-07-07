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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const mongo_gridfs_1 = require("mongo-gridfs");
const mongodb_1 = require("mongodb");
const Mongo_1 = require("../../Config/Mongo");
let FileService = class FileService {
    constructor() {
        this.initializeFileModel();
    }
    async initializeFileModel() {
        const MongoClient = require('mongodb').MongoClient;
        const client = new MongoClient(Mongo_1.DATA_BASE_CONFIGURATION.mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const db = client.db();
            this.fileModel = new mongo_gridfs_1.MongoGridFS(db, 'fs');
            this.gridFSBucket = new mongodb_1.GridFSBucket(db, { bucketName: 'fs' });
        }
        catch (err) {
            throw new common_1.HttpException('Failed to connect to MongoDB', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async readStream(id) {
        if (!this.fileModel) {
            throw new common_1.HttpException('File model is not initialized', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return await this.fileModel.readFileStream(id);
    }
    async findInfo(id) {
        if (!this.fileModel) {
            throw new common_1.HttpException('File model is not initialized', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const result = await this.fileModel.findById(id).catch(err => {
            throw new common_1.HttpException('File not found', common_1.HttpStatus.NOT_FOUND);
        });
        return {
            filename: result.filename,
            length: result.length,
            chunkSize: result.chunkSize,
            md5: '',
            contentType: result.contentType
        };
    }
    async deleteFile(id) {
        if (!this.fileModel) {
            throw new common_1.HttpException('File model is not initialized', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return await this.fileModel.delete(id);
    }
    async uploadFile(file) {
        return new Promise((resolve, reject) => {
            const writeStream = this.gridFSBucket.openUploadStream(file.originalname, {
                contentType: file.mimetype,
            });
            writeStream.on('finish', () => {
                resolve({
                    id: writeStream.id.toString(),
                    filename: file.originalname,
                    contentType: file.mimetype,
                });
            });
            writeStream.on('error', (error) => {
                reject(new common_1.HttpException(`File upload failed: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            });
            writeStream.end(file.buffer);
        });
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FileService);
//# sourceMappingURL=file.service.js.map