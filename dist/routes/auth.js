"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController = __importStar(require("../controller/auth.controller"));
var router = express_1.default.Router();
router.post("/login", authController.passportAuthenticate, authController.getUserData);
router.get("/logout", authController.logOut);
router.post('/signup', authController.passportRegistration, authController.getUserData);
router.get("/user", authController.getUserData);
router.post('/password', authController.setNewPassword);
router.post("/admin/login", authController.passportAuthenticate, authController.getAdminUserData);
router.post('/admin/signup', authController.passportRegistration, authController.getAdminUserData);
router.get('/admin/user', authController.getAdminUserData);
router.post('/admin/password', authController.setAdminNewPassword);
exports.default = router;
//# sourceMappingURL=auth.js.map