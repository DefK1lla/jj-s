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
exports.getFilesByAuhtorIdData = exports.getNewFilesData = exports.deleteFileDataById = exports.updateFileData = exports.findFileDataById = exports.findFileData = exports.setTranslateData = exports.createFileData = void 0;
const file_service_1 = require("../service/file.service");
const createFileData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, file_service_1.createFile)(req.body.author_id, req.body.folder_id, req.body.name, req.body.local, req.body.data);
        res.status(200);
        res.end();
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.createFileData = createFileData;
const setTranslateData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, file_service_1.setTranslate)(req.body.id, req.body.translate);
        res.status(200);
        res.end();
    }
    catch (e) {
        console.log(e);
        res.status(503);
        res.end(e.message);
    }
});
exports.setTranslateData = setTranslateData;
const findFileData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, file_service_1.getFiles)(req.body.id));
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.findFileData = findFileData;
const findFileDataById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, file_service_1.getFile)(req.body.id));
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.findFileDataById = findFileDataById;
const updateFileData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, file_service_1.updateFile)(req.body.id, req.body.name, req.body.local, req.body.data);
        res.status(200);
        res.end();
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.updateFileData = updateFileData;
const deleteFileDataById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, file_service_1.deleteFileJsonById)(req.body.id);
        res.status(200);
        res.end();
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.deleteFileDataById = deleteFileDataById;
const getNewFilesData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, file_service_1.getNewFiles)(req.body.id));
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.getNewFilesData = getNewFilesData;
const getFilesByAuhtorIdData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, file_service_1.getFilesByAuhtorId)(req.body.id));
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.getFilesByAuhtorIdData = getFilesByAuhtorIdData;
//# sourceMappingURL=file.controller.js.map