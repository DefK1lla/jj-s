import express from 'express';

import * as folderController from "../controller/folder.controller";

const router = express.Router();

router.post("/folder/all", folderController.findFolderData);
router.post("/folder/id", folderController.findFolderDataById)
router.post("/folder/set", folderController.createFolderData);
router.post("/folder/update", folderController.updateFolderData);
router.post("/folder/delete", folderController.deleteFolderDataById);

export default router;