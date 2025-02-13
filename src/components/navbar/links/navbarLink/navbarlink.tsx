"use client";

import Link from "next/link";
import React from "react";
import styles from "./navbarlink.module.css";
import { usePathname } from "next/navigation";

function NavbarLink({ item }: { item: any }) {
  const pathName = usePathname();
  return (
    <Link
      href={item.path}
      className={`${styles.container} 
    ${pathName === item.path && styles.active}
    `}
    >
      {item.title}
    </Link>
  );
}

export default NavbarLink;
