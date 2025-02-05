import React from "react";
import styles from "./postCard.module.css";
import Image from "next/image";
import Link from "next/link";
// import { data } from "./postData";
import { Post } from "@/app/types/types";

function PostCard({ post }: { post: Post }) {
  return (
    <div className={styles.container} key={post.id}>
      <div className={styles.topDiv}>
        <div className={styles.ImgContainer}>
          {post.img && (
            <Image
              src={post.img}
              width={300}
              height={250}
              alt=""
              className={styles.Img}
            />
          )}
        </div>
      </div>
      <div className={styles.bottomDiv}>
        <h1 className={styles.title}>{post.title}</h1>
        {/* <span className={styles.date}>{post.date}</span> */}
        <p className={styles.desc}>{post.desc}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
