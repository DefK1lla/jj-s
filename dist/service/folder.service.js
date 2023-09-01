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
exports.deleteFolderById = exports.updateFolder = exports.getFolderById = exports.getFolders = exports.createFolder = void 0;
const fs_1 = __importDefault(require("fs"));
const folder_model_1 = require("../model/folder.model");
const file_model_1 = require("../model/file.model");
function createFolder(name, game_id, img) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = new folder_model_1.Folder({
                name: name,
                game_id: game_id,
            });
            const data = yield file.save();
            fs_1.default.access('./src/imgs', (err) => {
                if (err) {
                    fs_1.default.mkdirSync('./src/imgs');
                }
                else {
                    fs_1.default.writeFileSync(`./src/imgs/${data.id}`, img);
                }
            });
            return 'success';
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.createFolder = createFolder;
function getFolders(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const folders = yield folder_model_1.Folder.find({ game_id: id });
            return folders.map((item) => {
                const img = fs_1.default.readFileSync(`./src/imgs/${item.id}`).toString();
                return {
                    name: item.name,
                    id: item._id,
                    game_id: item.game_id,
                    img: img
                };
            });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.getFolders = getFolders;
function getFolderById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const folder = yield folder_model_1.Folder.findById(id);
            const img = fs_1.default.readFileSync(`./src/imgs/${folder === null || folder === void 0 ? void 0 : folder.id}`).toString();
            return {
                id: folder === null || folder === void 0 ? void 0 : folder.id,
                name: folder === null || folder === void 0 ? void 0 : folder.name,
                game_id: folder === null || folder === void 0 ? void 0 : folder.game_id,
                img: img
            };
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.getFolderById = getFolderById;
function updateFolder(id, name, data, img) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield folder_model_1.Folder.findByIdAndUpdate({ _id: id }, {
                name: name,
                data: data,
            });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.updateFolder = updateFolder;
function deleteFolderById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield file_model_1.FileJson.find({ org_file_id: id });
            files.forEach((file) => {
                fs_1.default.unlinkSync(`./src/imgs/${file.id}`);
            });
            fs_1.default.unlinkSync(`./src/imgs/${id}`);
            yield file_model_1.FileJson.deleteMany({ org_file_id: id });
            return yield folder_model_1.Folder.findByIdAndRemove(id);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.deleteFolderById = deleteFolderById;
//# sourceMappingURL=folder.service.js.map