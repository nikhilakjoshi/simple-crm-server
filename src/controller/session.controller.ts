import { Request, Response } from "express";
import log from "../utils/logger";
import { createSession, FetchUserSessions, updateSessionValidity } from "./../service/session.service";
import { validateUserPassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function createSessionHandler(req: Request, res: Response) {
  try {
    //validate user password

    const user = await validateUserPassword(req.body);
    if (!user) return res.status(401).send({ message: "Invalid email or Password" });

    // create session

    const session = await createSession({ userId: user._id.toString() });

    // create access token
    const accessToken = signJwt(
      {
        ...user,
        session: session._id.toString(),
      },
      "accessTokenPrivateKey",
      {
        expiresIn: config.get<string>("accessTokenTtl"),
      }
    );

    // create refresh token
    const refreshToken = signJwt(
      {
        ...user,
        session: session._id.toString(),
      },
      "refreshTokenPrivateKey",
      {
        expiresIn: config.get<string>("refreshTokenTtl"),
      }
    );

    //return access and refresh token
    return res.status(200).send({ refreshToken, accessToken });
  } catch (e: any) {
    log.error(e);
    return res.status(403).send(e.message);
  }
}

export async function getUserSessionHandler(req: Request, resp: Response) {
  const user = resp.locals.user;
  if (!user || !user._id) return resp.status(403);

  const sessions = await FetchUserSessions(user._id);

  return resp.status(200).send(sessions);
}

export async function deleteUserSessionHandler(req: Request, resp: Response) {
  try {
    const sessionId = resp.locals.user.session;
    const temp = await updateSessionValidity({
      sessionId,
      isValid: false,
    });
    return resp.status(200).send({ message: "session deleted" });
  } catch (e: any) {
    return resp.status(500).send({ message: "Internal Server Error" });
  }
}
