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
exports.deleteFolderDataById = exports.updateFolderData = exports.findFolderDataById = exports.findFolderData = exports.createFolderData = void 0;
const folder_service_1 = require("../service/folder.service");
const createFolderData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, folder_service_1.createFolder)(req.body.name, req.body.game_id, req.body.img);
        res.status(200);
        res.end();
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.createFolderData = createFolderData;
const findFolderData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, folder_service_1.getFolders)(req.body.id));
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.findFolderData = findFolderData;
const findFolderDataById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, folder_service_1.getFolderById)(req.body.id));
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.findFolderDataById = findFolderDataById;
const updateFolderData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, folder_service_1.updateFolder)(req.body.id, req.body.name, req.body.data, req.body.img);
        res.status(200);
        res.end();
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.updateFolderData = updateFolderData;
const deleteFolderDataById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, folder_service_1.deleteFolderById)(req.body.id);
        res.status(200);
        res.end();
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.deleteFolderDataById = deleteFolderDataById;
//# sourceMappingURL=folder.controller.js.map