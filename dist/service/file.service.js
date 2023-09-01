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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesByAuhtorId = exports.getNewFiles = exports.deleteFileJsonById = exports.updateFile = exports.getFile = exports.getFiles = exports.setTranslate = exports.createFile = void 0;
const fs_1 = __importDefault(require("fs"));
const file_model_1 = require("../model/file.model");
function createFile(author_id, parentFolderId, name, local, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const subFile = new file_model_1.FileJson({
                folder_id: parentFolderId,
                name: name,
                local: local,
                author_id: author_id
            });
            if (data) {
                let result = yield subFile.save();
                fs_1.default.access('./src/files', (err) => {
                    if (err) {
                        fs_1.default.mkdirSync('./src/files');
                    }
                    else {
                        fs_1.default.writeFileSync(`./src/files/${result.id}_${result.name}_original.json`, data);
                        fs_1.default.writeFileSync(`./src/files/${result.id}_${result.name}_translate.json`, data);
                    }
                });
            }
            else {
                throw "file validation failed: data: Path `data` is required.";
            }
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.createFile = createFile;
function setTranslate(id, translate) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield file_model_1.FileJson.findById(id);
            const translateFile = fs_1.default.writeFileSync(`./src/files/${id}_${result === null || result === void 0 ? void 0 : result.name}_translate.json`, translate);
            return translateFile;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.setTranslate = setTranslate;
function getFiles(folderId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield file_model_1.FileJson.find({ folder_id: folderId });
            return data.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    local: item.local,
                    folder_id: item.folder_id
                };
            });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.getFiles = getFiles;
function getFile(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = yield file_model_1.FileJson.findById(id);
            const original = fs_1.default.readFileSync(`./src/files/${id}_${file.name}_original.json`, "utf-8").toString();
            const translate = fs_1.default.readFileSync(`./src/files/${id}_${file.name}_translate.json`, "utf-8").toString();
            return {
                id: id,
                name: file === null || file === void 0 ? void 0 : file.name,
                local: file === null || file === void 0 ? void 0 : file.local,
                data: original,
                translate: translate,
                folder_id: file === null || file === void 0 ? void 0 : file.folder_id
            };
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.getFile = getFile;
function updateFile(id, name, local, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = yield file_model_1.FileJson.findById(id);
            const result = yield file_model_1.FileJson.findByIdAndUpdate({ _id: id }, {
                name: name,
                local: local,
            });
            const original = fs_1.default.readFileSync(`./src/files/${id}_${file.name}_original.json`, "utf-8").toString();
            const translate = fs_1.default.readFileSync(`./src/files/${id}_${file.name}_translate.json`, "utf-8").toString();
            fs_1.default.unlinkSync(`./src/files/${id}_${file.name}_original.json`);
            fs_1.default.unlinkSync(`./src/files/${id}_${file.name}_translate.json`);
            fs_1.default.writeFileSync(`./src/files/${id}_${name}_original.json`, original);
            fs_1.default.writeFileSync(`./src/files/${id}_${name}_translate.json`, translate);
            return {
                id: result === null || result === void 0 ? void 0 : result.id,
                name: result === null || result === void 0 ? void 0 : result.name,
                local: result === null || result === void 0 ? void 0 : result.local,
                folder_id: result === null || result === void 0 ? void 0 : result.folder_id,
                data: original,
                translate: translate
            };
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.updateFile = updateFile;
function deleteFileJsonById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = yield file_model_1.FileJson.findById(id);
            fs_1.default.unlinkSync(`./src/files/${id}_${file.name}_original.json`);
            fs_1.default.unlinkSync(`./src/files/${id}_${file.name}_translate.json`);
            return yield file_model_1.FileJson.findByIdAndRemove(id);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.deleteFileJsonById = deleteFileJsonById;
function getNewFiles(authorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield file_model_1.FileJson.find({ author_id: authorId }).sort({ createdAt: -1 }).limit(4);
            return result.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    local: item.local
                };
            });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.getNewFiles = getNewFiles;
function getFilesByAuhtorId(authorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield file_model_1.FileJson.find({ author_id: authorId });
            return result.map((file) => {
                const translate = fs_1.default.readFileSync(`./src/files/${file.id}_${file.name}_translate.json`, "utf-8").toString();
                return {
                    name: file.name,
                    local: file.local,
                    translate: translate,
                };
            });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.getFilesByAuhtorId = getFilesByAuhtorId;
//# sourceMappingURL=file.service.js.map