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
exports.deleteChildFileJsonById = exports.deleteFileById = exports.updateChildFile = exports.updateFile = exports.getChildFiles = exports.getFiles = exports.createChildFile = exports.createFile = void 0;
var file_model_1 = require("../model/file.model");
function createFile(name, local, data) {
    return __awaiter(this, void 0, void 0, function () {
        var file, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    file = new file_model_1.FileJson({
                        name: name,
                        local: local,
                        data: data,
                    });
                    return [4 /*yield*/, file.save()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_1 = _a.sent();
                    throw new Error("Can not create file");
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createFile = createFile;
function createChildFile(parentFileId, name, local, data) {
    return __awaiter(this, void 0, void 0, function () {
        var subFile, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    subFile = new file_model_1.ChildFileJson({
                        org_file_id: parentFileId,
                        name: name,
                        local: local,
                        data: data,
                    });
                    return [4 /*yield*/, subFile.save()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_2 = _a.sent();
                    throw new Error("Can not create child file");
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createChildFile = createChildFile;
function getFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, file_model_1.FileJson.find()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_3 = _a.sent();
                    throw new Error("Can not find any files");
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getFiles = getFiles;
function getChildFiles(parentFileId) {
    return __awaiter(this, void 0, void 0, function () {
        var e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, file_model_1.ChildFileJson.find({ org_file_id: parentFileId })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_4 = _a.sent();
                    throw new Error("Can not find any child files by parent's ID");
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getChildFiles = getChildFiles;
function updateFile(id, name, local, data) {
    return __awaiter(this, void 0, void 0, function () {
        var e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, file_model_1.FileJson.findByIdAndUpdate({ _id: id }, {
                            name: name,
                            local: local,
                            data: data,
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_5 = _a.sent();
                    throw new Error("Can not update file");
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateFile = updateFile;
function updateChildFile(id, name, local, data) {
    return __awaiter(this, void 0, void 0, function () {
        var e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, file_model_1.ChildFileJson.findByIdAndUpdate({ _id: id }, {
                            name: name,
                            local: local,
                            data: data,
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_6 = _a.sent();
                    throw new Error("Can not update child file");
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateChildFile = updateChildFile;
function deleteFileById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, file_model_1.ChildFileJson.deleteMany({ org_file_id: id })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, file_model_1.FileJson.findByIdAndRemove(id)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_7 = _a.sent();
                    throw new Error("Can not delete file by ID");
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteFileById = deleteFileById;
function deleteChildFileJsonById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, file_model_1.ChildFileJson.findByIdAndRemove(id)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_8 = _a.sent();
                    throw new Error("Can not delete child file by ID");
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteChildFileJsonById = deleteChildFileJsonById;
//# sourceMappingURL=file.service.js.map