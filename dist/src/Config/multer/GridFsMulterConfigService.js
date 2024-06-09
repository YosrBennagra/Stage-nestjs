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
exports.GridFsMulterConfigService = void 0;
const common_1 = require("@nestjs/common");
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const Mongo_1 = require("../Mongo");
let GridFsMulterConfigService = class GridFsMulterConfigService {
    constructor() {
        this.gridFsStorage = new multer_gridfs_storage_1.GridFsStorage({
            url: Mongo_1.DATA_BASE_CONFIGURATION.mongoConnectionString,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    const filename = file.originalname.trim();
                    const fileInfo = {
                        filename: filename
                    };
                    resolve(fileInfo);
                });
            }
        });
    }
    createMulterOptions() {
        return {
            storage: this.gridFsStorage
        };
    }
};
exports.GridFsMulterConfigService = GridFsMulterConfigService;
exports.GridFsMulterConfigService = GridFsMulterConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GridFsMulterConfigService);
//# sourceMappingURL=GridFsMulterConfigService.js.map