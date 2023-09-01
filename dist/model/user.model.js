"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
});
exports.User = mongoose_1.default.model('userAuthentication', userSchema);
exports.Admin = mongoose_1.default.model('adminAuthentication', userSchema);
//# sourceMappingURL=user.model.js.map