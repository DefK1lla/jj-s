"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_session_1 = __importDefault(require("express-session"));
var body_parser_1 = __importDefault(require("body-parser"));
var passport_1 = __importDefault(require("passport"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var auth_1 = __importDefault(require("./routes/auth"));
var file_1 = __importDefault(require("./routes/file"));
var interpreter_1 = __importDefault(require("./routes/interpreter"));
var app = (0, express_1.default)();
require("dotenv").config();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: ["".concat(process.env.SECRET_KEY)],
    resave: true,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({ mongoUrl: "".concat(process.env.MONGODB_URI) }),
    cookie: {
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
}));
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/", auth_1.default);
app.use("/", file_1.default);
app.use("/", interpreter_1.default);
app.set("trust proxy", 1);
app.listen(process.env.PORT, function () {
    console.log("Listening on port ".concat(process.env.PORT, "!"));
    console.log("start");
});
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect("".concat(process.env.MONGODB_URI), function () {
    return console.log("connected to mongodb");
});
//# sourceMappingURL=index.js.map