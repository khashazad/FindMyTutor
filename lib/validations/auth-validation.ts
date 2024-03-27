import { TypeOf, object, string } from "zod";

export const signupSchema = object({
  email: string().email({ message: "A valid email is required" }),
  firstName: string()
    .min(3, { message: "First name must be at least 3 character long" })
    .max(20, "Name cannot exceed 20 characters"),
  lastName: string()
    .min(3, { message: "Last name must be at least 3 character long" })
    .max(20, "Name cannot exceed 20 characters"),
  phoneNumber: string()
    .min(10, "Phone number must be valid")
    .max(10, { message: "Phone number must be valid" }),
  password: string()
    .min(8, "Password must contain at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export type TSignupSchema = TypeOf<typeof signupSchema>;

export const loginSchema = object({
  email: string().email({ message: "A valid email is required" }),
  password: string()
    .min(8, "Password must contain at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export type TLoginSchema = TypeOf<typeof loginSchema>;
