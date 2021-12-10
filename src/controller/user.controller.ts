import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import log from "../utils/logger";
import { omit } from "lodash";
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  resp: Response
) {
  try {
    const user = await createUser(req.body);
    return resp.status(200).send(omit(user.toJSON(), "password"));
  } catch (e: any) {
    log.error(e);
    return resp.status(409).send(e.message);
  }
}
