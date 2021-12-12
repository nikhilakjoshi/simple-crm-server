import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  valid: true;
}

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  valid: { type: Boolean, default: true },
});

const sessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default sessionModel;
