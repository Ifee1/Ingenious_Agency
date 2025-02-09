import { NextResponse } from "next/server";
import { connectToDb } from "../../../../lib/connectToDb";
import { Post } from "../../../../lib/models";

export const GET = async (req: any, res: any, params: any) => {
  const { slug } = params;
  try {
    connectToDb();
    const post = await Post.findOne(slug);
    return NextResponse.json(post);
  } catch (error) {
    throw new Error("Data not found");
  }
};
