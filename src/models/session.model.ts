import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document {
  userId: UserDocument["_id"];
}

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const sessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default sessionModel;
