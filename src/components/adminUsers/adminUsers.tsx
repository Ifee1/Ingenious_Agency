import React from "react";
import styles from "./adminUsers.module.css";
import { getAllUsers } from "@/lib/data";
import Image from "next/image";
import { deleteUser } from "@/lib/actions";

async function AdminUsers() {
  const users = await getAllUsers();
  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users?.map(function (user) {
        return (
          <div className={styles.user} key={user.id}>
            <div className={styles.detail}>
              <Image
                src={user.img || "/user.png"}
                alt=""
                width={50}
                height={50}
              />
              <span className={styles.userTitle}>{user.username}</span>
            </div>
            <form action={deleteUser}>
              <input type="hidden" name="id" value={user.id} />
              <button className={styles.postButton}>Delete</button>
            </form>
          </div>
        );
      })}
    </div>
  );
}

export default AdminUsers;
