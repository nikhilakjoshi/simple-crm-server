import jwt, { JwtPayload } from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options: { expiresIn: string }
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");
  const { expiresIn } = options;
  return jwt.sign(object, signingKey, {
    expiresIn,
    algorithm: "RS256",
  });
}

export function verifyJwt(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
): {
  valid: boolean;
  expired: boolean | string;
  decoded: JwtPayload | string;
} {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: "",
    };
  }
}
