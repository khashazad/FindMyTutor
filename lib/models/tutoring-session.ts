import { Model, Schema, model, models, Types } from "mongoose";

export type SessionStatus = "pending" | "accepted" | "declined";

export interface TutoringSession extends Document {
  _id: string;
  message: string;
  date: Date;
  student: Types.ObjectId | Record<string, unknown>;
  tutor: Types.ObjectId | Record<string, unknown>;
  subject: string;
  status: SessionStatus;
  response?: string;
}

interface TutoringSessionModel extends Model<TutoringSession> {}

export const TutoringSessionSchema = new Schema<
  TutoringSession,
  TutoringSessionModel
>(
  {
    message: { type: String, required: true },
    date: { type: Date, required: true },
    student: { type: Types.ObjectId, required: true, ref: "User" },
    tutor: { type: Types.ObjectId, required: true, ref: "User" },
    subject: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
    response: { type: String, required: false },
  },
  {
    timestamps: true, // This enables automatic createdAt and updatedAt fields
  },
);

export default models.TutoringSession ||
  model("TutoringSession", TutoringSessionSchema);
