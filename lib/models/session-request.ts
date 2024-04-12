import { Model, Schema, model, models, Types } from "mongoose";

export type RequestStatus = "submitted" | "accepted" | "rejected";

export interface SessionRequest extends Document {
  _id: string;
  message: string;
  date: Date;
  student: Types.ObjectId | Record<string, unknown>;
  tutor: Types.ObjectId | Record<string, unknown>;
  subject: string;
  status: RequestStatus;
  response?: string;
}

interface SessionRequestModel extends Model<SessionRequest> {}

/**
 * Defines the schema for the User entity.
 */
export const SessionRequestSchema = new Schema<
  SessionRequest,
  SessionRequestModel
>(
  {
    message: { type: String, required: true },
    date: { type: Date, required: true },
    student: { type: Types.ObjectId, required: true, ref: "User" },
    tutor: { type: Types.ObjectId, required: true, ref: "User" },
    subject: { type: String, required: true },
    status: { type: String, required: true, default: "submitted" },
    response: { type: String, required: false },
  },
  {
    timestamps: true, // This enables automatic createdAt and updatedAt fields
  },
);

export default models.Request || model("Request", SessionRequestSchema);
