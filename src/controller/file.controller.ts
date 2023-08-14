import { Request, Response, NextFunction } from "express";

import { 
    createFile, 
    createChildFile,
    getFiles,
    getChildFiles,
    updateFile,
    updateChildFile,
    deleteFileById,
    deleteChildFileJsonById 
} from "../service/file.service";

export const createFileData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createFile(req.body.name, req.body.local, req.body.data);
        
        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const createChildFileData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createChildFile(
            req.body.parentFileId, 
            req.body.name,
            req.body.local,
            req.body.data
        );

        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const findFileData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getFiles());
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const findChildFileData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getChildFiles(req.body.id))
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const updateFileData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateFile(
            req.body.id,
            req.body.name,
            req.body.local,
            req.body.data
            );
        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const updateChildFileData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateChildFile(
            req.body.id,
            req.body.name,
            req.body.local,
            req.body.data,
        );
        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const deleteFileDataById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteFileById(req.body.id);
        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const deleteChildFileDataById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteChildFileJsonById(req.body.id);
        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}