"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordAdmin = exports.adminAuthentication = exports.saveAdmin = exports.ResetPassword = exports.authenticationById = exports.authentication = exports.saveUser = void 0;
const user_model_1 = require("../model/user.model");
function saveUser(name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isUserExist = yield user_model_1.User.findOne({ name: name });
            if (isUserExist !== null) {
                return isUserExist;
            }
            const user = new user_model_1.User({
                name: name,
                password: password
            });
            return yield user.save();
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.saveUser = saveUser;
function authentication(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.User.findOne({ name: name });
        if (user === null) {
            return null;
        }
        return { id: user.id, username: user.name, password: user.password };
    });
}
exports.authentication = authentication;
function authenticationById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.User.findById(id);
        return {
            id: user === null || user === void 0 ? void 0 : user.id,
            username: user === null || user === void 0 ? void 0 : user.name,
            admin: false
        };
    });
}
exports.authenticationById = authenticationById;
function ResetPassword(id, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield user_model_1.User.findByIdAndUpdate(id, {
                password: password
            });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.ResetPassword = ResetPassword;
function saveAdmin(name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isUserExist = yield user_model_1.Admin.findOne({ name: name });
            if (isUserExist !== null) {
                return isUserExist;
            }
            const user = new user_model_1.Admin({
                name: name,
                password: password
            });
            return yield user.save();
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.saveAdmin = saveAdmin;
function adminAuthentication(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.Admin.findOne({ name: name });
        if (user === null) {
            return null;
        }
        return { id: user.id, username: user.name, password: user.password, admin: false };
    });
}
exports.adminAuthentication = adminAuthentication;
function ResetPasswordAdmin(id, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield user_model_1.Admin.findByIdAndUpdate(id, {
                password: password
            });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.ResetPasswordAdmin = ResetPasswordAdmin;
//# sourceMappingURL=user.service.js.map