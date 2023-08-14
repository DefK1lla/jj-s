import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import passport from "passport";

import { saveUser } from "../service/user.service";

export const registration = (req: Request, res: Response, next: NextFunction) => {
    const salt = +process.env.SALT!;
    bcrypt.hash(req.body.password, salt, async (err: Error, hash: string) => {
        try {    
            const result = await saveUser(req.body.username, hash)
            res.status(200);
            res.end();
        } catch(e) {
            res.status(503);
            res.end("User exist");
        }
       
    })      
}

export const logOut = (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) { 
            return next(err) 
        }
        res.status(200);
        res.end();
    })
}

export const passportAuthenticate = passport.authenticate('local', {
    successMessage: `success`,
    failureMessage: `failure` 
})