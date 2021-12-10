import { Express, Request, Response } from "express";
import { createSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

const routes = (app: Express) => {
  app.get("/api/v1/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  //creates a new user
  app.post(
    "/api/v1/user",
    validateResource(createUserSchema),
    createUserHandler
  );

  //creates a new user Session
  app.post(
    "/api/v1/session",
    validateResource(createSessionSchema),
    createSessionHandler
  );
};

export default routes;
