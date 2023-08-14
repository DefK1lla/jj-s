import express from "express";

import * as fileController from "../controller/file.controller";

const router = express.Router();

router.post("/file", fileController.createFileData);
router.post("/file/child", fileController.createChildFileData);
router.post("/file/all", fileController.findFileData);
router.post("/file/child/all", fileController.findChildFileData);
router.post("/file/update", fileController.updateFileData);
router.post("/file/child/update", fileController.updateChildFileData);
router.post("/file/delete", fileController.deleteFileDataById);
router.post("/file/child/delete", fileController.deleteFileDataById);

export default router;
