import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { saveUser, ResetPassword, saveAdmin, ResetPasswordAdmin } from "../service/user.service";
import passport from '../passport/index';
import { Admin, User } from "../../src/model/user.model";

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
    req.logout( { keepSessionInfo: false },(err) => {
        console.log(err)
        if (err) { 
            return next(err) 
        }
        res.status(200);
        res.end();
    })
    
}

export const passportAuthenticate = passport.authenticate("local", {
  successMessage: true,
  failureMessage: true,
});

export const passportRegistration = passport.authenticate( "local-signup", {
    successMessage: true,
    failureMessage: true
});


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
                        console.log(hash)
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

export const adminRegistration = (req: Request, res: Response, next: NextFunction) => {
    const salt = +process.env.SALT!;
    bcrypt.hash(req.body.password, salt, async (err: Error, hash: string) => {
        try {   
            const hasAdmin = await Admin.findOne();
            if(hasAdmin?.id) {
                throw new Error("The administrator is already there. It is forbidden to create another admin");
            }
            const result = await saveAdmin(req.body.username, hash)
            res.send(result)
        } catch(e) {
            res.status(503);
            res.end(e);
        }
       
    })      
}


export const passportAdminAuthenticate = passport.authenticate( 'local-admin', {
    successMessage: true,
    failureMessage: true
});

export const passportAdminRegistration = passport.authenticate( "local-signup-admin", {
    successMessage: true,
    failureMessage: true
}
)

export const getAdminUserData = async (req: Request, res: Response) => {
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

export const setAdminNewPassword = async (req: Request, res: Response) => {
    try {
        if (req.user) {
            const user = await Admin.findById(req.body.id);
            bcrypt.compare(req.body.old_password, user?.password!, (err: Error, result: boolean) => {
                if (result) {
                    const salt = +process.env.SALT!;
                    bcrypt.hash(req.body.new_password, salt, async (err: Error, hash: string) => {
                        console.log(hash)
                        res.send(await ResetPasswordAdmin(req.body.id, hash));
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
