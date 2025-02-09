"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./links.module.css";
import NavbarLink from "./navbarLink/navbarlink";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
async function logout() {
  await signOut();

  console.log("logged out");
}
function Links() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // console.log("🔹 Navbar session status:", status);
  // console.log("🔹 Navbar session data:", session);

  function handleOpen() {
    setOpen(!open);
  }

  type Linkk = {
    title: string;
    path: string;
  };

  const links: Linkk[] = [
    {
      title: "HomePage",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.links}>
          {links.map(function (link) {
            return (
              // <Link href={link.path} key={link.title}>
              //   {link.title}
              // </Link>
              <NavbarLink item={link} key={link.title} />
            );
          })}

          {session?.user?.isAdmin && (
            <NavbarLink item={{ title: "Admin", path: "/admin" }} />
          )}

          {session?.user ? (
            <form action={logout}>
              <button className={styles.logout}>Logout</button>
            </form>
          ) : (
            <NavbarLink item={{ title: "Login", path: "/login" }} />
          )}
        </div>
        <button className={styles.menuButton} onClick={handleOpen}>
          Menu
        </button>
        {open && (
          <div className={styles.mobileLinks}>
            {links.map(function (link) {
              return <NavbarLink item={link} key={link.title} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Links;
