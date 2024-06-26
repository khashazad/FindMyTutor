"use server";

import axios from "axios";
import { SessionStatus } from "./lib/models/tutoring-session";

export async function updateSessionStatus(
  sessionId: string,
  status: SessionStatus,
  reason?: string,
) {
  try {
    await axios.patch(`${process.env.API_URL}/tutoring-session`, {
      sessionId,
      status,
      response: reason,
    });
  } catch (error: any) {
    let message =
      "An error occured when accepting the session request, please try again!";

    if (error.response && error.response.data.message)
      message = error.response.data.message;

    throw new Error(message);
  }
}
