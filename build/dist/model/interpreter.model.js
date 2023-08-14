"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translation = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var interpreter = new mongoose_1.default.Schema({
    user_id: { type: String, required: true },
    translated_text_id: { type: Number, required: true },
    name: { type: String, required: true },
    translated_text: { type: String, required: true },
    translated_text_score: { type: Number, default: 0 },
    who_appreciates_id: { type: String, required: false },
});
var translation = new mongoose_1.default.Schema({
    data_id: { type: String, required: true },
    interpreter: [{ type: interpreter, require: true }],
});
exports.Translation = mongoose_1.default.model("translation", translation);
//# sourceMappingURL=interpreter.model.js.map