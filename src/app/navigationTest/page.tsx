"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function NavigationPage() {
  // CLIENT NAVIGATION
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  function handleClick() {
    router.push("/");
  }
  return (
    <div>
      <Link href={"/"} prefetch={false}>
        Click Here
      </Link>
      <button onClick={handleClick}>Redirect</button>
    </div>
  );
}

export default NavigationPage;
