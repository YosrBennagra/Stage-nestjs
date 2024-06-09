import { GridFSBucketReadStream } from 'mongodb';
import { FileInfoVm } from './model/FileInfoVm ';
export declare class FileService {
    private fileModel;
    private gridFSBucket;
    constructor();
    private initializeFileModel;
    readStream(id: string): Promise<GridFSBucketReadStream>;
    findInfo(id: string): Promise<FileInfoVm>;
    deleteFile(id: string): Promise<boolean>;
}
