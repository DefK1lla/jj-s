import express, { Request, Response, NextFunction} from'express';
import passport from 'passport';
import {Strategy} from 'passport-local';
import crypto from 'crypto';

import { setLogin, getLogin } from '../db/login';

const router = express.Router();

passport.use(new Strategy(async function verify(username, password, cb) {
    const userLogin = await getLogin(username);
    
    if (userLogin === null ) { return cb(null, false, { message: 'Incorrect username or passsword.' }); }

    crypto.pbkdf2(password, userLogin.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
    if (err) { return cb(err); }

    if (!crypto.timingSafeEqual(userLogin.password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, userLogin);
 })
}))

passport.serializeUser((user, cb) => {
    process.nextTick(() => 
        cb(null, { id: user?.id, username: user?.username })
    )
})

passport.deserializeUser((user: any, cb) => {
    process.nextTick(() => {
        return cb(null, user)
    })
})

router.post(`/login/password`, passport.authenticate('local', {
    successRedirect: `/`,
    failureRedirect: `/login` 
}));

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
        if (err) { return next(err) }

        setLogin(req.body.username, hashedPassword, salt)
        .then(() => res.redirect(`/`))
        .catch((e)=> {console.log(e)})
        .finally(() => res.end('err')); //template
        
    })
})

export default router;