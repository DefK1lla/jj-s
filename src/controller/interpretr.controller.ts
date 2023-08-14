import { Request, Response, NextFunction } from "express";

import {
  createTranslation,
  getTranslation,
  updateTranslation,
  deleteTranslation,
} from "../service/interpreter.service";

export const createTranslations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTranslation(req.body.data_id, req.body.interpreter);
    res.status(200);
    res.end();
  } catch (e: any) {
    res.status(503);
    res.end(e.message);
  }
};

export const getTranslations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(await getTranslation(req.body.data_id));
  } catch (e: any) {
    res.status(503);
    res.end(e.message);
  }
};

export const updateTranslations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateTranslation(req.body.data_id, req.body.interpreter);
    res.status(200);
    res.end();
  } catch (e: any) {
    res.status(503);
    res.end(e.message);
  }
};

export const deleteTranslations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteTranslation(req.body.id);
    res.status(200);
    res.end();
  } catch (e: any) {
    res.status(503);
    res.end(e.message);
  }
};
