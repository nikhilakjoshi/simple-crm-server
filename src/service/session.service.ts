import { get } from "lodash";
import sessionModel from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import log from "../utils/logger";
import { findUserById } from "./user.service";
import config from "config";

export async function createSession({
  userId,
}: {
  userId: string;
}): Promise<any> {
  try {
    const session = await sessionModel.create({ userId });
    return session.toJSON();
  } catch (e: any) {
    log.error(e.errors);
  }
}

export async function FetchUserSessions(userId: string): Promise<any> {
  const sessions = await sessionModel.find({ userId });
  return !sessions || sessions.length === 0 ? false : sessions;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<any> {
  const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");
  if (!decoded || !get(decoded, "session")) return false;

  const session = await sessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUserById({ _id: session.userId });
  if (!user) return false;

  const newToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.get<string>("accessTokenTtl") }
  );

  return newToken;
}
