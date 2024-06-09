/// <reference types="multer" />
/// <reference types="multer-gridfs-storage" />
import { PromptBodyWithImages, PromptBody } from 'src/uses-case/chatgpt/dto/prompt.dto';
import { OpenaiService } from 'src/uses-case/chatgpt/openai.service';
export declare class OpenaiController {
    private openaiService;
    constructor(openaiService: OpenaiService);
    getPromptResponse(body: PromptBody): Promise<string>;
    getPromoptResponseWithImages(images: Array<Express.Multer.File>, body: PromptBodyWithImages): Promise<string>;
}
