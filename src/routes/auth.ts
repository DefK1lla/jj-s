import express, { Request, Response, NextFunction} from'express';
import bcrypt from 'bcryptjs';

import { setLogin } from '../db/login';
import passport from "../passport"

const router = express.Router();

router.post(`/login`, passport.authenticate('local', {
    successMessage: `success`,
    failureMessage: `failure` 
}));

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) { 
            return next(err) 
        }
        res.status(200);
        res.end();
    })
})

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    const salt = +process.env.SALT!;
    bcrypt.hash(req.body.password, salt, async (err: Error, hash: string) => {
        try {    
            const result = await setLogin(req.body.username, hash)
            res.status(200);
            res.end();
        } catch(e) {
            res.status(503);
            res.end("User exist");
        }
       
    })      
})

export default router;