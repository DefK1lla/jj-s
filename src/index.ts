import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth";
import fileRouter from "./routes/file";
import interpretrRouter from "./routes/interpreter";
import folderRouter from "./routes/folder";
import gameRouter from "./routes/game";

const app = express();
require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://jj-c.vercel.app/"],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());

app.use(
  session({
    secret: [`${process.env.SECRET_KEY}`],
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URI }),
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/", fileRouter);
app.use("/", interpretrRouter);
app.use("/", folderRouter);
app.use("/", gameRouter);

app.set("trust proxy", 1);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
  console.log("start");
});

mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGODB_URI}`, () =>
  console.log("connected to mongodb")
);
