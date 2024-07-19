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
exports.AssignmentDurationSchema = exports.AssignmentDuration = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AssignmentDuration = class AssignmentDuration extends mongoose_2.Document {
};
exports.AssignmentDuration = AssignmentDuration;
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], AssignmentDuration.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", String)
], AssignmentDuration.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Assignment' }),
    __metadata("design:type", String)
], AssignmentDuration.prototype, "assignmennt", void 0);
exports.AssignmentDuration = AssignmentDuration = __decorate([
    (0, mongoose_1.Schema)()
], AssignmentDuration);
exports.AssignmentDurationSchema = mongoose_1.SchemaFactory.createForClass(AssignmentDuration);
//# sourceMappingURL=AssignmentDuration.Schema.js.map