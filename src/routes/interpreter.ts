import express from "express";

import * as interpreterController from "../controller/interpretr.controller";

const router = express.Router();

router.get('/interpreter', interpreterController.getInterpreters);
router.post('/interpreter/create', interpreterController.createInterpreters);
router.put('/interpreter/update', interpreterController.updateInterpreters);
router.delete('/interpreter/delete', interpreterController.deleteInterpreters);

export default router;
