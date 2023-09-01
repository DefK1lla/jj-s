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
exports.deleteInterpreters = exports.updateInterpreters = exports.getInterpreters = exports.createInterpreters = void 0;
const interpreter_service_1 = require("../service/interpreter.service");
const createInterpreters = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, interpreter_service_1.createInterpreter)(req.body.user_id, req.body.name, req.body.recent_translated, req.body.scored_text);
        res.status(200);
        res.end();
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.createInterpreters = createInterpreters;
const getInterpreters = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, interpreter_service_1.getInterpreter)(req.body.user_id));
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.getInterpreters = getInterpreters;
const updateInterpreters = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, interpreter_service_1.updateInterpreter)(req.body.user_id, req.body.name, req.body.recent_translated, req.body.scored_text);
        res.status(200);
        res.end();
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.updateInterpreters = updateInterpreters;
const deleteInterpreters = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, interpreter_service_1.deleteInterpreter)(req.body.id);
        res.status(200);
        res.end();
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.deleteInterpreters = deleteInterpreters;
//# sourceMappingURL=interpretr.controller.js.map