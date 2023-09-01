"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileJson = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const fileJson = new mongoose_1.default.Schema({
    folder_id: { type: String, required: true },
    name: { type: String, required: true },
    local: { type: String, required: true },
    author_id: { type: String, required: true }
}, { timestamps: true });
exports.FileJson = mongoose_1.default.model('file', fileJson);
//# sourceMappingURL=file.model.js.map