import express from "express";

import * as gameController from "../controller/game.controller";

const router = express.Router();

router.get("/game", gameController.getGameData);
router.post('/game', gameController.createGameData);
router.put("/game", gameController.updateGameData);
router.delete("/game", gameController.deleteGameData);

export default router;