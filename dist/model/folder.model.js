"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const folderJson = new mongoose_1.default.Schema({
    game_id: { type: String, required: true },
    name: { type: String, required: true },
});
exports.Folder = mongoose_1.default.model("folder", folderJson);
//# sourceMappingURL=folder.model.js.map