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
exports.deleteInterpreter = exports.getInterpreter = exports.updateInterpreter = exports.createInterpreter = void 0;
const interpreter_model_1 = require("../model/interpreter.model");
function createInterpreter(user_id, name, recent_translated, scored_text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isDataExist = interpreter_model_1.Interpreter.findOne({ user_id: user_id });
            if (isDataExist === null) {
                return new Error('Interpreter exist and it have to be unique');
            }
            const interpreter = new interpreter_model_1.Interpreter({
                user_id: user_id,
                name: name,
                recent_translated: recent_translated,
                scored_text: scored_text,
            });
            return yield interpreter.save();
        }
        catch (e) {
            throw new Error('Can not save Interpreter');
        }
    });
}
exports.createInterpreter = createInterpreter;
function updateInterpreter(user_id, name, recent_translated, scored_text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield interpreter_model_1.Interpreter.findOneAndUpdate({ user_id: user_id }, {
                name: name,
                recent_translated: recent_translated,
                scored_text: scored_text
            });
        }
        catch (e) {
            throw new Error('Can not update Interpreter');
        }
    });
}
exports.updateInterpreter = updateInterpreter;
function getInterpreter(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield interpreter_model_1.Interpreter.findOne({ user_id: user_id });
        }
        catch (e) {
            throw new Error('Can not find Interpreter');
        }
    });
}
exports.getInterpreter = getInterpreter;
function deleteInterpreter(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield interpreter_model_1.Interpreter.findByIdAndDelete(id);
        }
        catch (e) {
            throw new Error('Can not delete Interpreter');
        }
    });
}
exports.deleteInterpreter = deleteInterpreter;
//# sourceMappingURL=interpreter.service.js.map