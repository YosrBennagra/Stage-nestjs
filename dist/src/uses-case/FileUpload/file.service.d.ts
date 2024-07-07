/// <reference types="multer" />
/// <reference types="multer-gridfs-storage" />
import { GridFSBucketReadStream } from 'mongodb';
import { FileUploadDto } from './model/FileUploadDto';
import { FileInfoVm } from './model/FileInfoVm ';
export declare class FileService {
    private fileModel;
    private gridFSBucket;
    constructor();
    private initializeFileModel;
    readStream(id: string): Promise<GridFSBucketReadStream>;
    findInfo(id: string): Promise<FileInfoVm>;
    deleteFile(id: string): Promise<boolean>;
    uploadFile(file: Express.Multer.File): Promise<FileUploadDto>;
}
