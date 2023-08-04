import express from 'express';

import * as controller from '../controller/file.controller';

const router = express.Router();

router.post('/file', controller.createFileData);
router.post('/file/child', controller.createChildFileData);
router.post('/file/all', controller.findFileData);
router.post('/file/child/all', controller.findChildFileData);
router.post('/file/update', controller.updateFileData);
router.post('/file/child/update', controller.updateChildFileData);
router.post('/file/delete', controller.deleteFileDataById);
router.post('/file/child/delete', controller.deleteFileDataById);

export default router;