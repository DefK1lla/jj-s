import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { saveUser } from "../service/user.service";
import passport from "../passport/index";

interface User {
  id: string;
  username: string;
}

export const registration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const salt = +process.env.SALT!;
  bcrypt.hash(req.body.password, salt, async (err: Error, hash: string) => {
    try {
      console.log(req.body);
      const result = await saveUser(req.body.name, hash);
      res.status(200);
      res.end();
    } catch (e) {
      res.status(503);
      res.end(e);
    }
  });
};

export const logOut = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200);
    res.end();
  });
};

export const passportAuthenticate = passport.authenticate("local", {
  successMessage: true,
  failureMessage: true,
});

export const passportAuthenticateCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(JSON.stringify({ auth: req.isAuthenticated(), user: req.user }));
};

export const getUserData = (req: Request, res: Response) => {
  if (!req.user) {
    res.send("Unauthorized");
  } else {
    res.send(
      JSON.stringify({
        //@ts-ignore
        id: req.user!.id,
        //@ts-ignore
        username: req.user!.username,
      })
    );
  }
};
