import Link from "next/link";
import React from "react";
import Links from "./links/links";
import styles from "./navbar.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function navbar() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>
      <div className="link">
        <Links />
      </div>
    </div>
  );
}

export default navbar;
