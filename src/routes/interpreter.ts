import express from 'express';

import * as interpreterController from '../controller/interpretr.controller';

const router = express.Router();

router.post('/interpreter', interpreterController.getTranslations);
router.post('/interpreter/create', interpreterController.createTranslations);
router.post('/interpreter/update', interpreterController.updateTranslations);
router.post('/interpreter/delete', interpreterController.deleteTranslations);

export default router;