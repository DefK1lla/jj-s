import passport, { session } from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import { authentication, authenticationById, saveAdmin, adminAuthentication } from '../service/user.service';
import { saveUser } from '../service/user.service';
import { Admin, User } from '../../src/model/user.model';

passport.use("local", new Strategy({
    usernameField: "username",
    passwordField: "password",
    session: true
},async function verify(name, password, cb) {
    const userLogin = await authentication(name);
    if (userLogin === null ) { return cb(null, false, { message: 'Incorrect username' }); }

    bcrypt.compare(password, userLogin.password, (err: Error, result: boolean) => {
        if (err) {
            return cb(err);
        }
        if(!result) { 
            return cb(null, false, { message: 'Incorrect password.' });
        } else {
            return cb(null, userLogin, {message: "Correct username and password"});
        }
    })
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

passport.use("local-admin", new Strategy({
    usernameField: "username",
    passwordField: "password",
    session: true
},async function verify(name, password, cb) {
    const userLogin = await adminAuthentication(name);
    if (userLogin === null ) { return cb(null, false, { message: 'Incorrect username' }); }

    bcrypt.compare(password, userLogin.password, (err: Error, result: boolean) => {
        if (err) {
            return cb(err);
        }
        if(!result) { 
            return cb(null, false, { message: 'Incorrect password.' });
        } else {
            userLogin.admin = true
            return cb(null, userLogin, {message: "Correct username and password"});
        }
    })
 }))
passport.use('local-signup-admin', new Strategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async function verify(req, username, password, done) {
    const salt = +process.env.SALT!;
    const user = await Admin.findOne();
    if (user) {
        
        return done("TThe administrator is already there. It is forbidden to create another admin",
         false, 
         { message: 'The administrator is already there. It is forbidden to create another admin' })

    } else {
        bcrypt.hash(password, salt, async (err: Error, hash: string) => {
            try {   
                
                const result = await saveAdmin(req.body.username, hash)
                result.admin = true
                done(null, result, {message: "Correct username and password"})
            } catch(e) {
                return done(e);
            }
        
        })
    } 

}))

passport.serializeUser((user: any, cb) => {
        
        return cb(null, {id: user.id, admin: user?.admin})
})

passport.deserializeUser( async (data: any, cb) => {
    const user = await authenticationById(data.id)
    user.admin = data.admin
    return cb(null, user)
})
export default passport;
