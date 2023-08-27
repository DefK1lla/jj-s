import { Request, Response, NextFunction } from "express";

import {
    createFolder,
    getFolders,
    updateFolder,
    deleteFolderById,
    getFolderById
} from "../service/folder.service";

export const createFolderData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createFolder(
            req.body.name, 
            req.body.game_id, 
            req.body.img
            );
        
        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const findFolderData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getFolders(req.body.id));
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const findFolderDataById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getFolderById(req.body.id));
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const updateFolderData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateFolder(
            req.body.id,
            req.body.name,
            req.body.data,
            req.body.img
            );
        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const deleteFolderDataById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteFolderById(req.body.id);
        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}