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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesByAuhtorId = exports.getNewFiles = exports.deleteFileJsonById = exports.updateFile = exports.getFile = exports.getFiles = exports.setTranslate = exports.createFile = void 0;
var fs_1 = __importDefault(require("fs"));
var file_model_1 = require("../model/file.model");
function createFile(author_id, parentFolderId, name, local, data) {
    return __awaiter(this, void 0, void 0, function () {
        var subFile, result_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    subFile = new file_model_1.FileJson({
                        folder_id: parentFolderId,
                        name: name,
                        local: local,
                        author_id: author_id
                    });
                    if (!data) return [3 /*break*/, 2];
                    return [4 /*yield*/, subFile.save()];
                case 1:
                    result_1 = _a.sent();
                    fs_1.default.access('./src/files', function (err) {
                        if (err) {
                            fs_1.default.mkdirSync('./src/files');
                        }
                        else {
                            fs_1.default.writeFileSync("./src/files/".concat(result_1.id, "_").concat(result_1.name, "_original.json"), data);
                            fs_1.default.writeFileSync("./src/files/".concat(result_1.id, "_").concat(result_1.name, "_translate.json"), data);
                        }
                    });
                    return [3 /*break*/, 3];
                case 2: throw "file validation failed: data: Path `data` is required.";
                case 3: return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log(e_1);
                    throw e_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createFile = createFile;
function setTranslate(id, translate) {
    return __awaiter(this, void 0, void 0, function () {
        var result, translateFile, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, file_model_1.FileJson.findById(id)];
                case 1:
                    result = _a.sent();
                    translateFile = fs_1.default.writeFileSync("./src/files/".concat(id, "_").concat(result === null || result === void 0 ? void 0 : result.name, "_translate.json"), translate);
                    return [2 /*return*/, translateFile];
                case 2:
                    e_2 = _a.sent();
                    console.log(e_2);
                    throw e_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.setTranslate = setTranslate;
function getFiles(folderId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, file_model_1.FileJson.find({ folder_id: folderId })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.map(function (item) {
                            return {
                                id: item.id,
                                name: item.name,
                                local: item.local,
                                folder_id: item.folder_id
                            };
                        })];
                case 2:
                    e_3 = _a.sent();
                    console.log(e_3);
                    throw e_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getFiles = getFiles;
function getFile(id) {
    return __awaiter(this, void 0, void 0, function () {
        var file, original, translate, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, file_model_1.FileJson.findById(id)];
                case 1:
                    file = _a.sent();
                    original = fs_1.default.readFileSync("./src/files/".concat(id, "_").concat(file.name, "_original.json"), "utf-8").toString();
                    translate = fs_1.default.readFileSync("./src/files/".concat(id, "_").concat(file.name, "_translate.json"), "utf-8").toString();
                    return [2 /*return*/, {
                            id: id,
                            name: file === null || file === void 0 ? void 0 : file.name,
                            local: file === null || file === void 0 ? void 0 : file.local,
                            data: original,
                            translate: translate,
                            folder_id: file === null || file === void 0 ? void 0 : file.folder_id
                        }];
                case 2:
                    e_4 = _a.sent();
                    console.log(e_4);
                    throw e_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getFile = getFile;
function updateFile(id, name, local, data) {
    return __awaiter(this, void 0, void 0, function () {
        var file, result, original, translate, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, file_model_1.FileJson.findById(id)];
                case 1:
                    file = _a.sent();
                    return [4 /*yield*/, file_model_1.FileJson.findByIdAndUpdate({ _id: id }, {
                            name: name,
                            local: local,
                        })];
                case 2:
                    result = _a.sent();
                    original = fs_1.default.readFileSync("./src/files/".concat(id, "_").concat(file.name, "_original.json"), "utf-8").toString();
                    translate = fs_1.default.readFileSync("./src/files/".concat(id, "_").concat(file.name, "_translate.json"), "utf-8").toString();
                    fs_1.default.unlinkSync("./src/files/".concat(id, "_").concat(file.name, "_original.json"));
                    fs_1.default.unlinkSync("./src/files/".concat(id, "_").concat(file.name, "_translate.json"));
                    fs_1.default.writeFileSync("./src/files/".concat(id, "_").concat(name, "_original.json"), original);
                    fs_1.default.writeFileSync("./src/files/".concat(id, "_").concat(name, "_translate.json"), translate);
                    return [2 /*return*/, {
                            id: result === null || result === void 0 ? void 0 : result.id,
                            name: result === null || result === void 0 ? void 0 : result.name,
                            local: result === null || result === void 0 ? void 0 : result.local,
                            folder_id: result === null || result === void 0 ? void 0 : result.folder_id,
                            data: original,
                            translate: translate
                        }];
                case 3:
                    e_5 = _a.sent();
                    console.log(e_5);
                    throw e_5;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateFile = updateFile;
function deleteFileJsonById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var file, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, file_model_1.FileJson.findById(id)];
                case 1:
                    file = _a.sent();
                    fs_1.default.unlinkSync("./src/files/".concat(id, "_").concat(file.name, "_original.json"));
                    fs_1.default.unlinkSync("./src/files/".concat(id, "_").concat(file.name, "_translate.json"));
                    return [4 /*yield*/, file_model_1.FileJson.findByIdAndRemove(id)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_6 = _a.sent();
                    console.log(e_6);
                    throw e_6;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteFileJsonById = deleteFileJsonById;
function getNewFiles(authorId) {
    return __awaiter(this, void 0, void 0, function () {
        var result, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, file_model_1.FileJson.find({ author_id: authorId }).sort({ createdAt: -1 }).limit(4)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.map(function (item) {
                            return {
                                id: item.id,
                                name: item.name,
                                local: item.local
                            };
                        })];
                case 2:
                    e_7 = _a.sent();
                    console.log(e_7);
                    throw e_7;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getNewFiles = getNewFiles;
function getFilesByAuhtorId(authorId) {
    return __awaiter(this, void 0, void 0, function () {
        var result, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, file_model_1.FileJson.find({ author_id: authorId })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.map(function (file) {
                            var translate = fs_1.default.readFileSync("./src/files/".concat(file.id, "_").concat(file.name, "_translate.json"), "utf-8").toString();
                            return {
                                name: file.name,
                                local: file.local,
                                translate: translate,
                            };
                        })];
                case 2:
                    e_8 = _a.sent();
                    console.log(e_8);
                    throw e_8;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getFilesByAuhtorId = getFilesByAuhtorId;
//# sourceMappingURL=file.service.js.map