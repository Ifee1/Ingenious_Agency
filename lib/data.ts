import mongoose from "mongoose";
import { connectToDb } from "./connectToDb";
import { Post, Uuser } from "./models";
import { unstable_noStore } from "next/cache";

export const getAllPosts = async () => {
  try {
    await connectToDb();
    const db = mongoose.connection;
    // console.log("Connected to DB:", db.name);
    const posts = await Post.find();
    // console.log("Posts fetched:", posts);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch all posts");
  }
};

export const getSinglePost = async (slug: string) => {
  try {
    await connectToDb();
    const post = await Post.findOne({ slug });
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Post");
  }
};

export const getAllUsers = async () => {
  unstable_noStore();
  try {
    await connectToDb();
    const users = await Uuser.find();
    // console.log("Posts:", users);

    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Users");
  }
};

export const getUser = async (id: string | { userId: string }) => {
  try {
    await connectToDb();
    const userId = typeof id === "object" && "userId" in id ? id.userId : id;
    const user = await Uuser.findById(userId.toString());
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch User");
  }
};
