"use server";

import { LoginUser, postFormData, RegisterUser } from "@/app/types/types";
import { connectToDb } from "./connectToDb";
import { Post, Uuser } from "./models";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "next-auth/react";
import bcrypt from "bcrypt";
import { error } from "console";

export const addPost = async (formData: postFormData) => {
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
    console.log("Saved to DB");
    // console.log("Slug being saved:", normalizedSlug);
    // console.log("Database name:", mongoose.connection.name);
  } catch (error) {
    console.error(error);
    throw new Error("Something's Up");
  }
};

export const deletePost = async (_id: any) => {
  const { id } = _id;
  try {
    await connectToDb();

    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
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
  const { username, email, password, passwordRepeat, img } = formData;

  try {
    await connectToDb();

    if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
    }
    const user = await Uuser.findOne({ username });
    if (user) {
      if (user.email === email) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          return {
            success: true,
            message: "User already exists",
          };
        } else {
          return { success: false, error: "Incorrect password" };
        }
      } else {
        // If the username exists but the email doesn't match
        return {
          success: false,
          error: "User already exists with a different email",
        };
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new Uuser({
      username,
      email,
      password: hashPassword,
      // passwordRepeat,
      img,
    });
    await newUser.save();
    return { success: true, message: "Registration successful!" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred during registration.",
    };
  }
};

export const loginUser = async (previousState: any, formData: LoginUser) => {
  const { username, password } = formData;
  try {
    await connectToDb();
    console.log("🔹 Fetching user with username:", formData.username);
    const user = await Uuser.findOne({ username });
    if (user) {
      console.log(user);
      if (user.username === username) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          return {
            success: true,
            message: "Logged In",
          };
        }
      }
      console.log(user);
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await signIn("credentials", { username, password });
    // await signIn("credentials", { username, password, redirect: false });
  } catch (error: any) {
    return {
      error: "Invalid username or passsword",
    };
  }
};
