import express, { Request, Response, NextFunction} from'express';
import passport from 'passport';
import {Strategy} from 'passport-local';
import bcrypt from 'bcryptjs';

import { setLogin, getLogin, getLoginById } from '../db/login';

interface User {
    id: any;
    username: string;
}

const router = express.Router();

passport.use(new Strategy({
    usernameField: "username",
    passwordField: "password"
},async function verify(username, password, cb) {
    const userLogin = await getLogin(username);
    
    console.log(userLogin)
    if (userLogin === null ) { return cb(null, false, { message: 'Incorrect username' }); }
   
    const saltRounds = process.env.SALT!;

    bcrypt.compare(password, userLogin.password, (err: Error, result: boolean) => {
        if(!result) { 
            return cb(null, false, { message: 'Incorrect password.' });
         }
    })
    return cb(null, userLogin, {message: ""});
 }))

passport.serializeUser((user: any, cb) => {
        return cb(null, user.id)
})

passport.deserializeUser( async (data: any, cb) => {
    console.log(data)
    const user = await getLoginById(data)
    return cb(null, user)
})

router.post(`/login/password`, passport.authenticate('local', {
    successRedirect: `/`,
    failureRedirect: `/login` 
}));

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) { return next(err) }

        res.redirect('/');
    })
})

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    const salt = +process.env.SALT!;
    bcrypt.hash(req.body.password, salt, async (err: Error, hash: string) => {
        const result = await setLogin(req.body.username, hash)
        res.redirect(`/`)
       
    })      
})

export default router;