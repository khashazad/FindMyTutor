import { TypeOf, object, string, date } from "zod";

export const tutoringSession = object({
  message: string(),
  subject: string(),
  date: date(),
});

export type TTutoringSession = TypeOf<typeof tutoringSession>;
