import { Request, Response, NextFunction } from "express";

import {
    createGame,
    getGames,
    updateGame,
    deleteGame,
    getGameById
} from "../service/game.service";

export async function createGameData(req: Request, res: Response, next: NextFunction) {
    try {
        await createGame(
            req.body.author_id,
            req.body.name,
            req.body.img
        );

        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export async function getGameDataById(req: Request, res: Response, next: NextFunction) {
    try {
        
        res.send(await getGameById(req.body.id));
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }    
}

export async function getGameData(req: Request, res: Response, next: NextFunction) {
    try {
        res.send(await getGames());
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }    
}

export async function updateGameData(req: Request, res: Response, next: NextFunction) {
    try {
        await updateGame(
            req.body.id,
            req.body.name,
            req.body.img
        );

        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }    
}

export async function deleteGameData(req: Request, res: Response, next: NextFunction) {
    try {
        await deleteGame(req.body.id);

        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }    
}