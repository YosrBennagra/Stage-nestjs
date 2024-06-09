/// <reference types="multer" />
/// <reference types="multer-gridfs-storage" />
import { ConfigService } from '@nestjs/config';
export declare class OpenaiService {
    private readonly config;
    private genAI;
    private geminiPro;
    private geminiProVision;
    constructor(config: ConfigService);
    getPromptResponse(prompt: string): Promise<string>;
    getPromoptResponseWithImages(prompt: string, images: Array<Express.Multer.File>): Promise<string>;
    getImageResponse(prompt: string): Promise<string>;
    fileToGenerativePart(path: string, mimeType: string): {
        inlineData: {
            data: string;
            mimeType: string;
        };
    };
}
