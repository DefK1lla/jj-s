import express from 'express';

import * as folderController from "../controller/folder.controller";

const router = express.Router();

router.get("/folder", folderController.findFolderData);
router.post("/folder", folderController.createFolderData);
router.put("/folder", folderController.updateFolderData);
router.delete("/folder", folderController.deleteFolderDataById);

export default router;