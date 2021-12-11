import { DocumentDefinition } from "mongoose";
import sessionModel, { SessionDocument } from "../models/session.model";
import log from "../utils/logger";

export async function createSession({
  userId,
}: {
  userId: string;
}): Promise<any> {
  try {
    const session = await sessionModel.create({ userId });
    return session;
  } catch (e: any) {
    log.error(e.errors);
  }
}
