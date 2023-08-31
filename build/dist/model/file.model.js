"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildFileJson = exports.FileJson = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var fileJson = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    local: { type: String, required: true },
    data: { type: String, required: true },
});
var childFileJson = new mongoose_1.default.Schema({
    org_file_id: { type: String, required: true },
    name: { type: String, required: true },
    data: { type: String, required: true },
    local: { type: String, required: true },
});
exports.FileJson = mongoose_1.default.model("file", fileJson);
exports.ChildFileJson = mongoose_1.default.model("subFile", childFileJson);
//# sourceMappingURL=file.model.js.map