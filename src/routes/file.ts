import express from 'express';

import * as fileController from '../controller/file.controller';

const router = express.Router();

router.post('/file', fileController.createFileData);
router.get('/file', fileController.findFileData);
router.put('/file', fileController.updateFileData);
router.delete('/file', fileController.deleteFileDataById);



export default router;