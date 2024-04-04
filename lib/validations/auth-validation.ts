import { TypeOf, object, string, number } from "zod";

export const studnetSignupSchema = object({
  email: string({ required_error: "Email is required" }).email({
    message: "A valid email is required",
  }),
  firstName: string({ required_error: "First name field is required" })
    .min(3, { message: "First name must be at least 3 character long" })
    .max(20, "Name cannot exceed 20 characters"),
  lastName: string({ required_error: "Last name is required" })
    .min(3, { message: "Last name must be at least 3 character long" })
    .max(20, "Name cannot exceed 20 characters"),
  phoneNumber: string({ required_error: "Phone number is required" })
    .min(10, "Phone number must be valid")
    .max(10, { message: "Phone number must be valid" }),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must contain at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export type TStudentSignupSchema = TypeOf<typeof studnetSignupSchema>;

export const tutorSignupSchema = object({
  email: string({ required_error: "Email is required" }).email({
    message: "A valid email is required",
  }),
  firstName: string({ required_error: "First name is required" })
    .min(3, { message: "First name must be at least 3 character long" })
    .max(20, "Name cannot exceed 20 characters"),
  lastName: string({ required_error: "Last name is required" })
    .min(3, { message: "Last name must be at least 3 character long" })
    .max(20, "Name cannot exceed 20 characters"),
  phoneNumber: string({ required_error: "Phone number is required" })
    .min(10, "Phone number must be valid")
    .max(10, { message: "Phone number must be valid" }),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must contain at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
  about: string().optional(),
  hourlyRate: number({
    required_error: "You must specify your hourly rate",
    invalid_type_error: "Hourly rate must be a number",
  }).positive("Hourly rate must be positive"),
});

export type TTutorSignupSchema = TypeOf<typeof tutorSignupSchema>;

export const loginSchema = object({
  email: string({ required_error: "Email is required to login" }).email({
    message: "A valid email is required",
  }),
  password: string({ required_error: "Password is required to login" })
    .min(8, "Password must contain at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export type TLoginSchema = TypeOf<typeof loginSchema>;
