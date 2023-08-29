import express from 'express';

import * as fileController from '../controller/file.controller';

const router = express.Router();

router.post('/file/set', fileController.createFileData);
router.post('/file/all', fileController.findFileData);
router.post('/file/id', fileController.findFileDataById)
router.post('/file', fileController.updateFileData);
router.post('/file/translate', fileController.setTranslateData);
router.post('/file', fileController.deleteFileDataById);
router.post('/file/news', fileController.getNewFilesData);
router.post('/file/author-id', fileController.getFilesByAuhtorIdData);


export default router;