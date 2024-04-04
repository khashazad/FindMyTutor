import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "@/lib/models/user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }

  interface User extends User {}
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    role: number;
  }
}
