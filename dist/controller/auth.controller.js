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
exports.setAdminNewPassword = exports.getAdminUserData = exports.passportAdminRegistration = exports.passportAdminAuthenticate = exports.adminRegistration = exports.setNewPassword = exports.getUserData = exports.passportRegistration = exports.passportAuthenticate = exports.logOut = exports.registration = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_service_1 = require("../service/user.service");
const index_1 = __importDefault(require("../passport/index"));
const user_model_1 = require("../model/user.model");
const registration = (req, res, next) => {
    const salt = +process.env.SALT;
    bcryptjs_1.default.hash(req.body.password, salt, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield (0, user_service_1.saveUser)(req.body.username, hash);
            res.send(result);
        }
        catch (e) {
            res.status(503);
            res.end(e);
        }
    }));
};
exports.registration = registration;
const logOut = (req, res, next) => {
    req.logout({ keepSessionInfo: false }, (err) => {
        console.log(err);
        if (err) {
            return next(err);
        }
        res.status(200);
        res.end();
    });
};
exports.logOut = logOut;
exports.passportAuthenticate = index_1.default.authenticate("local", {
    successMessage: true,
    failureMessage: true,
});
exports.passportRegistration = index_1.default.authenticate("local-signup", {
    successMessage: true,
    failureMessage: true,
});
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.send("Unauthorized");
        }
        else {
            res.send(req.user);
        }
    }
    catch (e) {
        res.status(503);
        res.end(e);
    }
});
exports.getUserData = getUserData;
const setNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const user = yield user_model_1.User.findById(req.body.id);
            bcryptjs_1.default.compare(req.body.old_password, user === null || user === void 0 ? void 0 : user.password, (err, result) => {
                if (result) {
                    const salt = +process.env.SALT;
                    bcryptjs_1.default.hash(req.body.new_password, salt, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                        console.log(hash);
                        res.send(yield (0, user_service_1.ResetPassword)(req.body.id, hash));
                    }));
                }
            });
        }
        else {
            throw Error("Unauthorized");
        }
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.setNewPassword = setNewPassword;
const adminRegistration = (req, res, next) => {
    const salt = +process.env.SALT;
    bcryptjs_1.default.hash(req.body.password, salt, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hasAdmin = yield user_model_1.Admin.findOne();
            if (hasAdmin === null || hasAdmin === void 0 ? void 0 : hasAdmin.id) {
                throw new Error("The administrator is already there. It is forbidden to create another admin");
            }
            const result = yield (0, user_service_1.saveAdmin)(req.body.username, hash);
            res.send(result);
        }
        catch (e) {
            res.status(503);
            res.end(e);
        }
    }));
};
exports.adminRegistration = adminRegistration;
exports.passportAdminAuthenticate = index_1.default.authenticate("local-admin", {
    successMessage: true,
    failureMessage: true,
});
exports.passportAdminRegistration = index_1.default.authenticate("local-signup-admin", {
    successMessage: true,
    failureMessage: true,
});
const getAdminUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.send("Unauthorized");
        }
        else {
            res.send(req.user);
        }
    }
    catch (e) {
        res.status(503);
        res.end(e);
    }
});
exports.getAdminUserData = getAdminUserData;
const setAdminNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const user = yield user_model_1.Admin.findById(req.body.id);
            bcryptjs_1.default.compare(req.body.old_password, user === null || user === void 0 ? void 0 : user.password, (err, result) => {
                if (result) {
                    const salt = +process.env.SALT;
                    bcryptjs_1.default.hash(req.body.new_password, salt, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                        console.log(hash);
                        res.send(yield (0, user_service_1.ResetPasswordAdmin)(req.body.id, hash));
                    }));
                }
            });
        }
        else {
            throw Error("Unauthorized");
        }
    }
    catch (e) {
        res.status(503);
        res.end(e.message);
    }
});
exports.setAdminNewPassword = setAdminNewPassword;
//# sourceMappingURL=auth.controller.js.map