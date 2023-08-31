import { Request, Response, NextFunction } from "express";

import {
    createInterpreter,
    getInterpreter,
    updateInterpreter,
    deleteInterpreter
} from '../service/interpreter.service';

export const createInterpreters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createInterpreter(
            req.body.user_id,
            req.body.name,
            req.body.recent_translated,
            req.body.scored_text
        );
        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const getInterpreters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getInterpreter(req.body.user_id));
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const updateInterpreters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateInterpreter(
            req.body.user_id,
            req.body.name,
            req.body.recent_translated,
            req.body.scored_text
            );
        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}

export const deleteInterpreters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteInterpreter(req.body.id)
        res.status(200);
        res.end();
    } catch (e: any) {
        res.status(503);
        res.end(e.message);
    }
}