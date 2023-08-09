import express from'express';

import * as controller from '../controller/auth.controller'

const router = express.Router();

router.post(`/login`, controller.passportAuthenticate, controller.passportAuthenticateCallback);

router.get('/logout', controller.logOut)

router.post('/signup', controller.registration)

router.get('/user', controller.getUserData);

export default router;