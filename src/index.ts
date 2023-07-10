import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import MongoStore from "connect-mongo";
const app = express();

require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

app.set("trust proxy", 1);
// app.use(
//   session({
//     secret: `${SECRET}`,
//     resave: true,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: MONGODB_URI }),
//     cookie: {
//       sameSite: 'none',
//       secure: true,
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//     },
//   })
// );
// app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
