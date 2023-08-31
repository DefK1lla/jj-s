import { Request, Response, NextFunction } from "express";

import { 
    createFile, 
    setTranslate,
    getFiles,
    getFile,
    updateFile,
    deleteFileJsonById,
    getNewFiles,
    getFilesByAuhtorId,
} from "../service/file.service";



export const createFileData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createFile(
            req.body.author_id,
            req.body.folder_id, 
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


export const setTranslateData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await setTranslate(
            req.body.id, 
            req.body.translate,
            );

        res.status(200);
        res.end();
    } catch (e: any) {
        console.log(e)
        res.status(503);
        res.end(e.message);
    }
}


export const findFileData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getFiles(req.body.id))
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}


export const findFileDataById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getFile(req.body.id))
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
        await deleteFileJsonById(req.body.id);

        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const getNewFilesData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getNewFiles(req.body.id));
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const getFilesByAuhtorIdData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getFilesByAuhtorId(req.body.id));
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}
