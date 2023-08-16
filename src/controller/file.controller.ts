import { Request, Response, NextFunction } from "express";

import { 
    createFile, 
    getFiles,
    updateFile,
    deleteFileJsonById,
} from "../service/file.service";



export const createFileData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createFile(
            req.body.parentFileId, 
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



export const findFileData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getFiles(req.body.id))
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