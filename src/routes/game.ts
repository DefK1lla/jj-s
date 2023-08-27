import express from "express";

import * as gameController from "../controller/game.controller";

const router = express.Router();

router.get("/game/all", gameController.getGameData);
router.post('/game/id', gameController.getGameDataById);
router.post('/game/set', gameController.createGameData);
router.post("/game/update", gameController.updateGameData);
router.post("/game/delete", gameController.deleteGameData);

export default router;