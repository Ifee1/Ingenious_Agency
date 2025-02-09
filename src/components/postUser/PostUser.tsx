import React from "react";
import styles from "./postUser.module.css";
import { getAllUsers, getUser } from "../../lib/data";
import Image from "next/image";

// const getData = async function (userId: number) {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${userId}`,
//     { cache: "no-store" }
//   );
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("Something went wrong");
//   }
// };
async function PostUser(userId: any) {
  // const { userId } = await params;
  const user = await getUser(userId);
  // console.log(user);
  return (
    <div className={styles.container}>
      <Image
        src={user.img ? user.img : "/user.png"}
        width={50}
        height={50}
        alt=""
        className={styles.userImg}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </div>
  );
}

export default PostUser;
