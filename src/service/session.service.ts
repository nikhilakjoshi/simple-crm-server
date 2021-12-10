import { DocumentDefinition } from "mongoose";
import sessionModel, { SessionDocument } from "../models/session.model";
import log from "../utils/logger";

export async function createSession(
  input: DocumentDefinition<Omit<SessionDocument, "createdAt" | "updatedAt">>
): Promise<any> {
  try {
    return await sessionModel.create(input);
  } catch (e: any) {
    log.error(e.errors);
  }
}
