import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import log from "../utils/logger";
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  resp: Response
) {
  try {
    const user = await createUser(req.body);
    return resp.send(user);
  } catch (e: any) {
    log.error(e);
    return resp.status(409).send(e.message);
  }
}
