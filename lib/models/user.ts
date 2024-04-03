import { Model, Schema, model, models, Types } from "mongoose";

export interface UserEntity extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: number;
  phoneNumber: string;
  bio: string;
  expertise: Types.Array<string>;
  rating: number;
}

interface UserModel extends Model<UserEntity> {}

/**
 * Defines the schema for the User entity.
 */
export const UserSchema = new Schema<UserEntity, UserModel>(
  {
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    bio: { type: String, required: false },
    expertise: { type: [String], required: false },
    rating: { type: Number, required: false },
  },
  {
    timestamps: true, // This enables automatic createdAt and updatedAt fields
  },
);

/**
 * Indices for uniqeness
 */

export const UserUniqueEmailIndex = "email_1";
export const UserUniquePhoneNumberIndex = "phoneNumber_1";

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ phoneNumber: 1 }, { unique: true });

export default models.User || model("User", UserSchema);
