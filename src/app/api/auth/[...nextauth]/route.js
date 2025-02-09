const login = async (credentials) => {
  try {
    await connectToDb();

    const user = await Uuser.findOne({ username: credentials.username });
    console.log(user);

    if (!user) {
      throw new Error("Wrong Credentials");
    }
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    console.log("Password correct?", isPasswordCorrect);
    if (!isPasswordCorrect) {
      console.error("Incorrect password");
      throw new Error("Wrong credentials");
    }
    // return user;
    return {
      id: user._id,
      name: user.username,
      email: user.email,
      image: user.image || "",
      isAdmin: user.isAdmin,
    };
  } catch (error) {
    console.error("Login function error:", error);
    // console.error(error);
    throw new Error("Something went wrong");
  }
};

import { connectToDb } from "@/lib/connectToDb";
import { Uuser } from "@/lib/models";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      // async authorize(credentials) {
      //   try {
      //     const user = await login(credentials);
      //     console.log(user);
      //     return user;
      //   } catch (error) {
      //     // console.log(error);
      //     return null;
      //   }
      // },
      async authorize(credentials) {
        try {
          // console.log("received credentials", credentials);
          const user = await login(credentials);

          // console.log("user found", user);
          if (!user) {
            console.error("User not found!");
            throw new error("Wrong credentials");
          }
          return user;
          // return null;
          // return {
          //   id: user._id,
          //   name: user.username,
          //   email: user.email,
          //   image: user.image || "",
          //   isAdmin: user.isAdmin,
          // };
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, profile, account);
      if (account.provider === "github") {
        connectToDb();
        try {
          const user = await Uuser.findOne({ email: profile.email });
          if (!user) {
            const newUser = new Uuser({
              name: profile.login,
              email: profile.email,
              image: profile.avatar_url,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
          isAdmin: token.isAdmin,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // console.log("User in JWT callback:", user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.isAdmin = user.isAdmin;
      }
      // console.log("Token after JWT callback:", token);

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
