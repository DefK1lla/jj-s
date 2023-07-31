import express, { Request, Response, NextFunction} from'express';

import * as controller from '../controller/controllerAuth'

const router = express.Router();

router.post(`/login`, controller.passportAuthenticate);

router.post('/logout', controller.logOut)

router.post('/signup', controller.registration)

export default router;