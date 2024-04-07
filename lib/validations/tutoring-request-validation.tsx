import { TypeOf, object, string, date } from "zod";

export const tutoringRequest = object({
  message: string(),
  subject: string(),
  date: date(),
});

export type TTutoringRequest = TypeOf<typeof tutoringRequest>;
