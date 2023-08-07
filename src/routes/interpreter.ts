import express from 'express';

import * as controller from '../controller/interpretr.controller';

const router = express.Router();

router.post('/interpreter', controller.getTranslations);
router.post('/interpreter/create', controller.createTranslations);
router.post('/interpreter/update', controller.updateTranslations);
router.post('/interpreter/delete', controller.deleteTranslations);

export default router;