import { FileService } from 'src/uses-case/FileUpload/file.service';
import { FileResponseVm } from 'src/uses-case/FileUpload/model/FileResponseVm ';
export declare class FileController {
    private filesService;
    constructor(filesService: FileService);
    upload(files: any): any[];
    getFileInfo(id: string): Promise<FileResponseVm>;
    getFile(id: string, res: any): Promise<any>;
    downloadFile(id: string, res: any): Promise<any>;
    deleteFile(id: string): Promise<FileResponseVm>;
}
