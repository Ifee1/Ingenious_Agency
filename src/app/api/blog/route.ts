import { NextResponse } from "next/server";
import { connectToDb } from "../../../lib/connectToDb";
import { Post } from "../../../lib/models";

export const GET = async (req: any, res: any) => {
  try {
    connectToDb();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    throw new Error("Data not found");
  }
};

export const DELETE = async (req: any, res: any, params: any) => {
  const { slug } = params;
  try {
    connectToDb();
    await Post.deleteOne(slug);
    return NextResponse.json("Post Deleted");
  } catch (error) {
    throw new Error("Data not deleted");
  }
};
