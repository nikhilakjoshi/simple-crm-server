import { Response } from "express";
import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../models/user.model";
import log from "../utils/logger";

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
): Promise<any> {
  try {
    const user = await User.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validateUserPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await User.findOne({ email });
    if (!user) return false;

    const isValid = user.comparePassword(password);

    if (!isValid) return false;

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    log.error(e);
    return false;
  }
}
