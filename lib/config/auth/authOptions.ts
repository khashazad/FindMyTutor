import { login } from "@/lib/auth";
import { connect } from "@/lib/config/db-config";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/lib/models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        return login(email, password);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }): Promise<any> {
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          await connect();
          const ifUserExists = await User.findOne({ email });
          if (ifUserExists) {
            return user;
          }
          const newUser = new User({
            name: name,
            email: email,
          });

          try {
            await newUser.save();
            return user;
          } catch (error) {
            console.log("Creating user failed (Google registration)");
          }
        } catch (err) {
          console.log(err);
        }
      }
      return user;
    },

    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.firstName;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
};
