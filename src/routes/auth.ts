import express from'express';

import * as authController from '../controller/auth.controller'

const router = express.Router();

router.post(`/login`, authController.passportAuthenticate, authController.passportAuthenticateCallback);

router.get('/logout', authController.logOut)

router.post('/signup', authController.registration)

router.get('/user', authController.getUserData);

export default router;