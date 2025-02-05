import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div>
      <h2>Not found</h2>
      <p>Sorry, the page doesn't exist</p>
      <Link href="/">Return to Home Page</Link>
    </div>
  );
}

export default NotFound;
