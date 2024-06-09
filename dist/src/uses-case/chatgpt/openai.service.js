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
exports.OpenaiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const generative_ai_1 = require("@google/generative-ai");
const fs = require("fs");
let OpenaiService = class OpenaiService {
    constructor(config) {
        this.config = config;
        this.genAI = new generative_ai_1.GoogleGenerativeAI(this.config.get("API_KEY"));
        this.geminiPro = this.genAI.getGenerativeModel({ model: "gemini-pro" });
        this.geminiProVision = this.genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    }
    async getPromptResponse(prompt) {
        const result = await this.geminiPro.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    }
    async getPromoptResponseWithImages(prompt, images) {
        const imageParts = [];
        for (let image of images) {
            imageParts.push(this.fileToGenerativePart(image.path, image.mimetype));
        }
        const result = await this.geminiProVision.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        const text = response.text();
        return text;
    }
    async getImageResponse(prompt) {
        const result = await this.geminiProVision.generateImage(prompt);
        const response = await result.response;
        const imageUrl = response.imageUrl();
        return imageUrl;
    }
    fileToGenerativePart(path, mimeType) {
        return {
            inlineData: {
                data: Buffer.from(fs.readFileSync(path)).toString("base64"),
                mimeType
            },
        };
    }
};
exports.OpenaiService = OpenaiService;
exports.OpenaiService = OpenaiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OpenaiService);
//# sourceMappingURL=openai.service.js.map