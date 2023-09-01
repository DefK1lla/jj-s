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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordAdmin = exports.adminAuthentication = exports.saveAdmin = exports.ResetPassword = exports.authenticationById = exports.authentication = exports.saveUser = void 0;
var user_model_1 = require("../model/user.model");
function saveUser(name, password) {
    return __awaiter(this, void 0, void 0, function () {
        var isUserExist, user, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, user_model_1.User.findOne({ name: name })];
                case 1:
                    isUserExist = _a.sent();
                    if (isUserExist !== null) {
                        return [2 /*return*/, isUserExist];
                    }
                    user = new user_model_1.User({
                        name: name,
                        password: password
                    });
                    return [4 /*yield*/, user.save()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.saveUser = saveUser;
function authentication(name) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.User.findOne({ name: name })];
                case 1:
                    user = _a.sent();
                    if (user === null) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, { id: user.id, username: user.name, password: user.password }];
            }
        });
    });
}
exports.authentication = authentication;
function authenticationById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.User.findById(id)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, {
                            id: user === null || user === void 0 ? void 0 : user.id,
                            username: user === null || user === void 0 ? void 0 : user.name,
                            admin: false
                        }];
            }
        });
    });
}
exports.authenticationById = authenticationById;
function ResetPassword(id, password) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1.User.findByIdAndUpdate(id, {
                            password: password
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_2 = _a.sent();
                    console.log(e_2);
                    throw e_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.ResetPassword = ResetPassword;
function saveAdmin(name, password) {
    return __awaiter(this, void 0, void 0, function () {
        var isUserExist, user, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, user_model_1.Admin.findOne({ name: name })];
                case 1:
                    isUserExist = _a.sent();
                    if (isUserExist !== null) {
                        return [2 /*return*/, isUserExist];
                    }
                    user = new user_model_1.Admin({
                        name: name,
                        password: password
                    });
                    return [4 /*yield*/, user.save()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_3 = _a.sent();
                    console.log(e_3);
                    throw e_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.saveAdmin = saveAdmin;
function adminAuthentication(name) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.Admin.findOne({ name: name })];
                case 1:
                    user = _a.sent();
                    if (user === null) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, { id: user.id, username: user.name, password: user.password, admin: false }];
            }
        });
    });
}
exports.adminAuthentication = adminAuthentication;
function ResetPasswordAdmin(id, password) {
    return __awaiter(this, void 0, void 0, function () {
        var e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1.Admin.findByIdAndUpdate(id, {
                            password: password
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_4 = _a.sent();
                    console.log(e_4);
                    throw e_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.ResetPasswordAdmin = ResetPasswordAdmin;
//# sourceMappingURL=user.service.js.map