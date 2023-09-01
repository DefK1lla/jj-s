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
exports.deleteGame = exports.updateGame = exports.getGames = exports.getGameById = exports.createGame = void 0;
const fs_1 = __importDefault(require("fs"));
const game_model_1 = require("../model/game.model");
const folder_model_1 = require("../model/folder.model");
const file_model_1 = require("../model/file.model");
function createGame(author_id, name, img) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const game = new game_model_1.Game({
                author_id: author_id,
                name: name,
            });
            const data = yield game.save();
            fs_1.default.access("./src/img", (err) => {
                if (err) {
                    fs_1.default.mkdirSync('./src/imgs');
                }
                else {
                    fs_1.default.writeFileSync(`./src/imgs/${data.id}`, img);
                }
            });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.createGame = createGame;
function getGameById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const game = yield game_model_1.Game.findById(id);
            if (game !== null) {
                const img = fs_1.default.readFileSync(`./src/imgs/${game.id}`).toString();
                return {
                    name: game.name,
                    id: game._id,
                    author_id: game === null || game === void 0 ? void 0 : game.author_id,
                    img: img
                };
            }
            else {
                return {};
            }
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.getGameById = getGameById;
function getGames() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const game = yield game_model_1.Game.find();
            return game.map((item) => {
                const img = fs_1.default.readFileSync(`./src/imgs/${item.id}`).toString();
                return {
                    name: item.name,
                    id: item._id,
                    author_id: item.author_id,
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
exports.getGames = getGames;
function updateGame(id, name, img) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield game_model_1.Game.findByIdAndUpdate({ _id: id }, {
                name: name,
            });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.updateGame = updateGame;
function deleteGame(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const game = yield game_model_1.Game.findById(id);
            const folders = yield folder_model_1.Folder.find({ game_id: game.id });
            folders.forEach((folder) => __awaiter(this, void 0, void 0, function* () {
                const files = yield file_model_1.FileJson.find({ folder_id: folder.id });
                files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                    fs_1.default.unlinkSync(`./src/imgs/${file.id}`);
                }));
                yield file_model_1.FileJson.deleteMany({ folder_id: folder.id });
                fs_1.default.unlinkSync(`./src/imgs/${folder.id}`);
            }));
            fs_1.default.unlinkSync(`./src/imgs/${id}`);
            yield game_model_1.Game.findByIdAndDelete(id);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.deleteGame = deleteGame;
//# sourceMappingURL=game.service.js.map