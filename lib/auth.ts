import bycrptjs from "bcryptjs";
import { connect } from "@/lib/config/db-config";
import User from "@/lib/models/user";

export async function login(email: string, password: string) {
  try {
    await connect();
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    const passwordsMatch = await bycrptjs.compare(password, user.password);
    if (!passwordsMatch) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Login error: ", error);
    return null;
  }
}
