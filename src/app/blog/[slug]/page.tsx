import React, { Suspense } from "react";
import styles from "./singleBlog.module.css";
import Image from "next/image";
import PostUser from "@/components/postUser/PostUser";
import { getSinglePost } from "../../../lib/data";

// FETCHING DATA WITH API
const getData = async function (slug: number) {
  try {
    const res = await fetch(`http://localhost:3000/api/blog${slug}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

// const deleteData = async function (slug: number) {
//   try {
//     const res = await fetch(`http://localhost:3000/api/blog${slug}`, {
//       method: "DELETE",
//     });
//     if (res.ok) return res.json();
//   } catch (error) {
//     console.error(error);
//     throw new Error("Something went wrong");
//   }
// };

export const generateMetadata = async ({ params }: { params: any }) => {
  const { slug } = await params;
  // const post = await getSinglePost(slug);
  const post = await getData(slug);

  return {
    title: post?.title,
    description: post?.description,
  };
};

async function SingleBlogPage({ params }: { params: any }) {
  const { slug } = await params;
  // console.log(slug);
  const post = await getSinglePost(slug);
  // console.log(post);

  return (
    <div className={styles.container}>
      <div className={styles.ImgContainer}>
        {post?.img && (
          <Image
            src={post?.img ? post.img : ""}
            width={300}
            height={400}
            alt=""
            className={styles.Img}
          />
        )}
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>

        <div className={styles.details}>
          {post && (
            <Suspense fallback={<div>Loading ...</div>}>
              <PostUser userId={post?.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post?.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.contentDiv}>{post?.desc}</div>
      </div>
    </div>
  );
}

export default SingleBlogPage;
