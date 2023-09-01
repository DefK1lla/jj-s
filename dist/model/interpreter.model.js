"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const interpreter = new mongoose_1.default.Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    recent_translated: { type: [String], required: false }
});
exports.Interpreter = mongoose_1.default.model('interpreter', interpreter);
//# sourceMappingURL=interpreter.model.js.map