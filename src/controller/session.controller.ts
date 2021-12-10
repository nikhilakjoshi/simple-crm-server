import { Request, Response } from "express";
import log from "../utils/logger";
import { createSession } from "./../service/session.service";
import { validateUserPassword } from "../service/user.service";

export async function createSessionHandler(req: Request, res: Response) {
  try {
    //validate user password

    const user = await validateUserPassword(req.body);
    if (!user)
      return res.status(401).send({ message: "Invalid email or Password" });

    // create session

    const session = await createSession(user._id);

    // create access token

    // create refresh token

    //return access and refresh token
    return res.status(200).send(session);
  } catch (e: any) {
    log.error(e);
    return res.status(403).send(e.message);
  }
}
