import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import { authentication, authenticationById } from '../service/user.service';

passport.use(new Strategy({
    usernameField: "username",
    passwordField: "password"
},async function verify(username, password, cb) {
    const userLogin = await authentication(username);
    
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
    const user = await authenticationById(data)
    return cb(null, user)
})

export default passport;