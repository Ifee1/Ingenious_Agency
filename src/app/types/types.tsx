import NextAuth, { Profile } from "next-auth";

export interface Post {
  userId: number;
  id: number;
  desc: string;
  title: string;
  img: string;
  slug: string;
}

export interface User {
  id: number;
  name: string;
}

export type postData = {
  Img: string;
  date: string;
  title: string;
  desc: string;
};

export type postFormData = {
  // Img: string;
  slug: string;
  title: string;
  desc: string;
  userId: string;
  id?: string;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: unknown;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
    };
  }
}

export interface GithubProfile extends Profile {
  login?: string;
  avatar_url?: string;
}

export type RegisterUser = {
  username: string;
  password: string;
  passwordRepeat: string;
  email: string;
  img?: string;
};

export type LoginUser = {
  username: string;
  password: string;
};
