import React from "react";
import styles from "./blog.module.css";
import PostCard from "@/components/postCard/postCard";
import { Post } from "../types/types";
import { getAllPosts } from "../../../lib/data";

// FETCHING DATA WITH AN API
const getData = async function () {
  try {
    const res = await fetch(`http://localhost:3000/api/blog`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

async function BlogPage(params: any) {
  // FETCHING DATA WITH AN API

  const posts = await getData();

  // FETCHING DATA WITHOUT AN API
  // const posts = await getAllPosts();
  // console.log(posts);
  return (
    <>
      <div className={styles.container}>
        {posts.map(function (post: Post) {
          return (
            <div className={styles.singlePost} key={post.id}>
              <PostCard post={post} />
            </div>
          );
        })}
      </div>
      <h1>Sup</h1>
    </>
  );
}

export default BlogPage;
