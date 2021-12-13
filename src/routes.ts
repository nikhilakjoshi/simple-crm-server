import { Express, Request, Response } from "express";
import { createSessionHandler, deleteUserSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import routeConfig from "./routeConfig";

const routes = (app: Express) => {
  app.get(routeConfig.healthCheck, (req: Request, res: Response) => res.sendStatus(200));

  //creates a new user
  app.post(routeConfig.users, validateResource(createUserSchema), createUserHandler);

  //creates a new user Session
  app.post(routeConfig.sessions, validateResource(createSessionSchema), createSessionHandler);

  // fetches all user sessions
  app.get(routeConfig.sessions, requireUser, getUserSessionHandler);

  // logout from (delete a) session
  app.delete(routeConfig.sessions, requireUser, deleteUserSessionHandler);
};

export default routes;
