import { Express, Request, Response } from "express";
import {
  createSessionHandler,
  deleteUserSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

const routes = (app: Express) => {
  app.get("/api/v1/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  //creates a new user
  app.post(
    "/api/v1/users",
    validateResource(createUserSchema),
    createUserHandler
  );

  //creates a new user Session
  app.post(
    "/api/v1/sessions",
    validateResource(createSessionSchema),
    createSessionHandler
  );

  // fetches all user sessions
  app.get("/api/v1/sessions", requireUser, getUserSessionHandler);

  // logout from (delete a) session
  app.delete("/api/v1/sessions", requireUser, deleteUserSessionHandler);
};

export default routes;
