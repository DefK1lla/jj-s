"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const file_1 = __importDefault(require("./routes/file"));
const interpreter_1 = __importDefault(require("./routes/interpreter"));
const folder_1 = __importDefault(require("./routes/folder"));
const game_1 = __importDefault(require("./routes/game"));
const app = (0, express_1.default)();
require("dotenv").config();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://jj-c.vercel.app/"],
    credentials: true,
}));
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(body_parser_1.default.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: [`${process.env.SECRET_KEY}`],
    resave: true,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGO_DB_URI }),
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
app.use("/", folder_1.default);
app.use("/", game_1.default);
app.set("trust proxy", 1);
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
    console.log("start");
});
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(`${process.env.MONGODB_URI}`, () => console.log("connected to mongodb"));
//# sourceMappingURL=index.js.map