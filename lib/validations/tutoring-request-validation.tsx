import { TypeOf, object, string, date } from "zod";

export const tutoringSession = object({
  message: string(),
  subject: string(),
  date: date(),
});

export type TTutoringSession = TypeOf<typeof tutoringSession>;

export const declineSession = object({
  session: string(),
  reason: string().optional(),
});

export type TDeclineSession = TypeOf<typeof declineSession>;
