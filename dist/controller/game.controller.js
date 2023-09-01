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
exports.deleteGameData = exports.updateGameData = exports.getGameData = exports.getGameDataById = exports.createGameData = void 0;
const game_service_1 = require("../service/game.service");
function createGameData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, game_service_1.createGame)(req.body.author_id, req.body.name, req.body.img);
            res.status(200);
            res.end();
        }
        catch (e) {
            res.status(503);
            res.end(e.message);
        }
    });
}
exports.createGameData = createGameData;
function getGameDataById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.send(yield (0, game_service_1.getGameById)(req.body.id));
        }
        catch (e) {
            res.status(503);
            res.end(e.message);
        }
    });
}
exports.getGameDataById = getGameDataById;
function getGameData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.send(yield (0, game_service_1.getGames)());
        }
        catch (e) {
            res.status(503);
            res.end(e.message);
        }
    });
}
exports.getGameData = getGameData;
function updateGameData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, game_service_1.updateGame)(req.body.id, req.body.name, req.body.img);
            res.status(200);
            res.end();
        }
        catch (e) {
            res.status(503);
            res.end(e.message);
        }
    });
}
exports.updateGameData = updateGameData;
function deleteGameData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, game_service_1.deleteGame)(req.body.id);
            res.status(200);
            res.end();
        }
        catch (e) {
            res.status(503);
            res.end(e.message);
        }
    });
}
exports.deleteGameData = deleteGameData;
//# sourceMappingURL=game.controller.js.map