import { NextFunction, Request, Response } from "express";

export default async function requireUser(req: Request, resp: Response, next: NextFunction) {
  const user = resp.locals.user;
  if (!user) {
    return resp.sendStatus(403);
  }

  return next();
}
