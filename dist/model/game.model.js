"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const game = new mongoose_1.default.Schema({
    author_id: { type: String, required: true },
    name: { type: String, required: true },
});
exports.Game = mongoose_1.default.model("game", game);
//# sourceMappingURL=game.model.js.map