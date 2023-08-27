import express from'express';

import * as authController from '../controller/auth.controller'

const router = express.Router();

router.post(`/login`, authController.passportAuthenticate, authController.getUserData);

router.get('/logout', authController.logOut)

router.post('/signup',authController.passportRegistration, authController.getUserData)

router.get('/user', authController.getUserData);

export default router;