"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Lesson_Schema_1 = require("../../Schema/Lesson.Schema");
const lesson_service_1 = require("./lesson.service");
const lesson_controller_1 = require("../../Controllers/lesson.controller");
const file_service_1 = require("../FileUpload/file.service");
const file_schema_1 = require("../../Schema/file.schema");
let LessonModule = class LessonModule {
};
exports.LessonModule = LessonModule;
exports.LessonModule = LessonModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: Lesson_Schema_1.Lesson.name, schema: Lesson_Schema_1.LessonSchema }]), mongoose_1.MongooseModule.forFeature([{ name: File.name, schema: file_schema_1.FileSchema }])
        ],
        providers: [lesson_service_1.LessonService, file_service_1.FileService],
        controllers: [lesson_controller_1.LessonController],
        exports: [lesson_service_1.LessonService],
    })
], LessonModule);
//# sourceMappingURL=lesson.module.js.map