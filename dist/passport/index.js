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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_service_1 = require("../service/user.service");
const user_service_2 = require("../service/user.service");
const user_model_1 = require("../../src/model/user.model");
passport_1.default.use("local", new passport_local_1.Strategy({
    usernameField: "username",
    passwordField: "password",
    session: true
}, function verify(name, password, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const userLogin = yield (0, user_service_1.authentication)(name);
        if (userLogin === null) {
            return cb(null, false, { message: 'Incorrect username' });
        }
        bcryptjs_1.default.compare(password, userLogin.password, (err, result) => {
            if (err) {
                return cb(err);
            }
            if (!result) {
                return cb(null, false, { message: 'Incorrect password.' });
            }
            else {
                return cb(null, userLogin, { message: "Correct username and password" });
            }
        });
    });
}));
passport_1.default.use('local-signup', new passport_local_1.Strategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, function verify(req, username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = +process.env.SALT;
        const user = yield user_model_1.User.findOne({ name: username });
        if (user) {
            return done("That login is already taken.", false, { message: 'That login is already taken.' });
        }
        else {
            bcryptjs_1.default.hash(password, salt, (err, hash) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield (0, user_service_2.saveUser)(req.body.username, hash);
                    done(null, result, { message: "Correct username and password" });
                }
                catch (e) {
                    return done(e);
                }
            }));
        }
    });
}));
passport_1.default.use("local-admin", new passport_local_1.Strategy({
    usernameField: "username",
    passwordField: "password",
    session: true
}, function verify(name, password, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const userLogin = yield (0, user_service_1.adminAuthentication)(name);
        if (userLogin === null) {
            return cb(null, false, { message: 'Incorrect username' });
        }
        bcryptjs_1.default.compare(password, userLogin.password, (err, result) => {
            if (err) {
                return cb(err);
            }
            if (!result) {
                return cb(null, false, { message: 'Incorrect password.' });
            }
            else {
                userLogin.admin = true;
                return cb(null, userLogin, { message: "Correct username and password" });
            }
        });
    });
}));
passport_1.default.use('local-signup-admin', new passport_local_1.Strategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, function verify(req, username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = +process.env.SALT;
        const user = yield user_model_1.Admin.findOne();
        if (user) {
            return done("TThe administrator is already there. It is forbidden to create another admin", false, { message: 'The administrator is already there. It is forbidden to create another admin' });
        }
        else {
            bcryptjs_1.default.hash(password, salt, (err, hash) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield (0, user_service_1.saveAdmin)(req.body.username, hash);
                    result.admin = true;
                    done(null, result, { message: "Correct username and password" });
                }
                catch (e) {
                    return done(e);
                }
            }));
        }
    });
}));
passport_1.default.serializeUser((user, cb) => {
    return cb(null, { id: user.id, admin: user === null || user === void 0 ? void 0 : user.admin });
});
passport_1.default.deserializeUser((data, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.authenticationById)(data.id);
    user.admin = data.admin;
    return cb(null, user);
}));
exports.default = passport_1.default;
//# sourceMappingURL=index.js.map