"use server";

import { LoginUser, postFormData, RegisterUser } from "@/app/types/types";
import { connectToDb } from "./connectToDb";
import { Post, Uuser } from "./models";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "next-auth/react";
import bcrypt from "bcryptjs";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";

export const addPost = async (previousState: any, formData: postFormData) => {
  const { title, desc, userId, slug } = formData;
  const normalizedSlug = slug
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase();
  try {
    await connectToDb();

    const newPost = new Post({
      title,
      desc,
      slug: normalizedSlug,
      userId,
    });
    await newPost.save();
    revalidatePath("/blog");
    revalidatePath("/admin");
    console.log("Saved to DB");
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};

export const deletePost = async (formData: FormData) => {
  const id = formData.get("id") as string;

  if (!id) {
    console.error("ID is missing from form submission");
    throw new Error("ID is missing");
  }

  try {
    await connectToDb();

    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
    revalidatePath("/admin");
    console.log("deleted fron DB");
    // console.log("Database name:", mongoose.connection.name);
  } catch (error) {
    console.error(error);
    throw new Error("Something's Up");
  }
};
export const addUser = async (previousState: any, formData: RegisterUser) => {
  const { username, email, password, img, isAdmin } = formData;

  try {
    await connectToDb();

    const newUser = new Uuser({
      username,
      email,
      password,
      img,
      isAdmin,
    });
    await newUser.save();
    revalidatePath("/admin");
    console.log("Saved to DB");
  } catch (error) {
    console.error(error);
    throw new Error("Something's Up");
  }
};

export const deleteUser = async (_id: any) => {
  const { id } = _id;
  try {
    await connectToDb();
    await Post.deleteMany({ userId: id });
    await Uuser.findOneAndDelete(id);
    revalidatePath("/admin");
    console.log("deleted fron DB");
    // console.log("Database name:", mongoose.connection.name);
  } catch (error) {
    console.error(error);
    throw new Error("Something's Up");
  }
};

export const registerUser = async (
  previousState: any,
  formData: RegisterUser
) => {
  const { username, email, password, passwordRepeat, img, isAdmin } = formData;

  try {
    await connectToDb();

    if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
      // return "Passwords do not match";
    }

    const user = await Uuser.findOne({ username });
    if (user) {
      return { error: "User already exists" };

      // if (user.email === email) {
      //   const passwordMatch = await bcrypt.compare(password, user.password);
      //   if (passwordMatch) {
      //     return {
      //       success: true,
      //       message: "User already exists",
      //     };
      //   } else {
      //     return { success: false, error: "Incorrect password" };
      //   }
      // } else {
      //   // If the username exists but the email doesn't match
      //   return {
      //     success: false,
      //     error: "User already exists with a different email",
      //   };
      // }
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new Uuser({
      username,
      email,
      password: hashPassword,
      // passwordRepeat,
      img,
      isAdmin,
    });
    await newUser.save();

    // console.log("Registration successful!");
    // return "Registration successful!";
    return { success: "Registration successful!" };
  } catch (error) {
    console.error(error);
    return {
      error: "An error occurred during registration.",
    };
  }
};

export const loginUser = async (previousState: any) => {
  try {
    await connectToDb();
  } catch (error: any) {
    console.log(error);
  }
};
