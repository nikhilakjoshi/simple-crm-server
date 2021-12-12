import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const bRegEx = /^Bearer\s/;
export default async function pullUserDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // extract tokens from auth header
  const incomingToken = get(req, "headers.authorization", "").replace(
    bRegEx,
    ""
  );
  const refreshToken = get(req, "headers.x-refresh-token", "");
  if (!!!incomingToken) return next();

  // verify the incoming token

  const { decoded, expired } = verifyJwt(incomingToken, "accessTokenPublicKey");
  if (!!decoded) {
    res.locals.user = decoded;
    return next();
  }
  // generate a new token if existing is expired
  if (!!expired && !!refreshToken) {
    const newToken = await reIssueAccessToken({ refreshToken });
    if (newToken) {
      res.setHeader("x-access-token", newToken);
    }

    //verify the new token and set that in locals
    const { decoded: newDecoded } = verifyJwt(
      newToken as string,
      "accessTokenPublicKey"
    );

    if (!!newDecoded) {
      res.locals.user = newDecoded;
      return next();
    }
  }
  return next();
}
