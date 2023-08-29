import passport, { session } from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import { authentication, authenticationById } from '../service/user.service';
import { saveUser } from '../service/user.service';
import { User } from '../../src/model/user.model';

passport.use("local-signin", new Strategy({
    usernameField: "username",
    passwordField: "password",
    session: true
},async function verify(name, password, cb) {
    const userLogin = await authentication(name);
    if (userLogin === null ) { return cb(null, false, { message: 'Incorrect username' }); }
    console.log(name)

    bcrypt.compare(password, userLogin.password, (err: Error, result: boolean) => {
        
        if(!result) { 
            return cb(null, false, { message: 'Incorrect password.' });
         }
    })
    return cb(null, userLogin, {message: "Correct username and password"});
 }))

passport.use('local-signup', new Strategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async function verify(req, username, password, done) {
    const salt = +process.env.SALT!;
    const user = await User.findOne({ name: username });
    if (user) {
        
        return done("That login is already taken.", false, { message: 'That login is already taken.' })
    } else {
        bcrypt.hash(password, salt, async (err: Error, hash: string) => {
            try {   
                
                const result = await saveUser(req.body.username, hash)
                
                done(null, result, {message: "Correct username and password"})
            } catch(e) {
                return done(e);
            }
        
        })
    } 

}))

passport.serializeUser((user: any, cb) => {
        
        return cb(null, user.id)
})

passport.deserializeUser( async (data: any, cb) => {
    const user = await authenticationById(data)
    
    return cb(null, user)
})

export default passport;