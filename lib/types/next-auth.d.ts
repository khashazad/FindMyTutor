import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserEntity } from "@/lib/models/user";

declare module "next-auth" {
  interface Session {
    id: string;
    role: number;
  }

  interface User extends UserEntity {}
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: number;
  }
}
