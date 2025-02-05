import NextAuth, {
  Account,
  AuthOptions,
  Profile,
  Session,
  User,
} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import { getProviders, signIn } from "next-auth/react";
import { connectToDb } from "../../../../../lib/connectToDb";
import { Uuser } from "../../../../../lib/models";
import { GithubProfile } from "@/app/types/types";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";
// import { authConfig } from "../../../../../lib/authConfig";

const login = async (credentials: any) => {
  try {
    await connectToDb();
    const user = await Uuser.findOne({ username: credentials.username });
    if (!user) {
      throw new Error("Wrong Credentials");
    }
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      credentials.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials");
    }
    console.log(user);
    return {
      id: user._id.toString(),
      name: user.username,
      email: user.email,
      image: user.image || "",
    } as User;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export const authOptions: AuthOptions = {
  // ...authConfig,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    Credentials({
      async authorize(credentials: any) {
        try {
          const user = await login(credentials);
          if (!user) return null;
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image || "",
          };
        } catch (error) {
          console.error("Error while authorizing credentials:", error);
          return null;
        }
      },
      credentials: {},
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | AdapterUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session callback received token:", token);
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        // session.user.image = token.image;
        session.user.isAdmin =
          session.user.email === "ifechukwudee582@gmail.com"; // Admin check
      }
      console.log("Session object after login:", session.user);
      return session;
    },

    async signIn({
      user,
      account,
      profile,
      email,
    }: {
      user: User | AdapterUser;
      account: Account | null;
      profile?: GithubProfile | undefined;
      email?: { verificationRequest?: boolean };
    }) {
      // console.log(user, account, profile, email, credentials);
      console.log("Sign-in callback:", user, account, profile, email);

      if (account?.provider === "github") {
        connectToDb();
        try {
          const user = await Uuser.findOne({ email: profile?.email });
          if (!user) {
            const newUser = new Uuser({
              username: profile?.login,
              email: profile?.email,
              image: profile?.avatar_url,
              provider: account.provider,
              providerId: account.id,
            });
            await newUser.save();
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return true;
    },
    // ...authConfig.callbacks,
  },
};
const handler = NextAuth(authOptions);
// console.log(authOptions);

export { handler as GET, handler as POST };
