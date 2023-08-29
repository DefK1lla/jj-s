import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';

import { saveUser, ResetPassword } from "../service/user.service";
import passport from '../passport/index';
import { User } from "../../src/model/user.model";

export const registration = (req: Request, res: Response, next: NextFunction) => {
    const salt = +process.env.SALT!;
    bcrypt.hash(req.body.password, salt, async (err: Error, hash: string) => {
        try {   
            const result = await saveUser(req.body.username, hash)
            
            res.send(result)
        } catch(e) {
            res.status(503);
            res.end(e);
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

export const passportAuthenticate = passport.authenticate( 'local-signin', {
    successMessage: true,
    failureMessage: true
});

export const passportRegistration = passport.authenticate( "local-signup", {
    successMessage: true,
    failureMessage: true
}
)

export const passportAuthenticateCallback = (req: Request, res: Response, next: NextFunction)=>{
    
    res.send(JSON.stringify({auth: req.isAuthenticated(), user: req.user}));
}

export const getUserData = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.send("Unauthorized");
        } else { 
            res.send(req.user);
        }
    } catch (e) {
        res.status(503);
        res.end(e);
    }
}

export const setNewPassword = async (req: Request, res: Response) => {
    try {
        if (req.user) {
            const user = await User.findById(req.body.id);
            bcrypt.compare(req.body.old_password, user?.password!, (err: Error, result: boolean) => {
                if (result) {
                    const salt = +process.env.SALT!;
                    bcrypt.hash(req.body.new_password, salt, async (err: Error, hash: string) => {
                        res.send(await ResetPassword(req.body.id, hash));
                    })
                }
            })

        } else {
            throw Error("Unauthorized")
        }
    } catch (e: any) {
        res.status(503);
        res.end(e.message)
    }
}
