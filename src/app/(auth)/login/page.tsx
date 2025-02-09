"use client";

import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { signIn, useSession } from "next-auth/react";
import { LoginUser } from "@/app/types/types";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/lib/actions";
import { connectToDb } from "@/lib/connectToDb";
import { Uuser } from "@/lib/models";

async function gitHubSignUp() {
  await signIn("github");
}

async function userCredentialSignIn(formData: LoginUser) {
  try {
    const { username, password, isAdmin } = formData;
    await signIn("credentials", { username, password, isAdmin });
    // console.log(isAdmin);
  } catch (error) {
    console.log(error);
  }
}

function LoginPage() {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();

  const [formData, setFormData] = useState<LoginUser>({
    username: "",
    password: "",
  });

  const [state, formAction] = useActionState(loginUser, undefined);

  useEffect(() => {
    if (session?.user) {
      const timeout = setTimeout(function () {
        router.push("/");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [session?.user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // startTransition(() => {
      //   formAction(formData);
      // });
      await userCredentialSignIn(formData);
      await loginUser({});
    } catch (error) {
      console.log(error);
      throw new Error("user not found");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={gitHubSignUp}>
          <button className={styles.github}>Log in with Github</button>
        </form>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                username: e.target.value,
              }))
            }
            placeholder="username"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                password: e.target.value,
              }))
            }
            placeholder="password"
          />

          <span>
            <input
              type="checkbox"
              name="isAdmin"
              placeholder="isAdmin"
              checked={!!formData.isAdmin}
              style={{ marginRight: "1rem" }}
              onChange={(e) =>
                setFormData({ ...formData, isAdmin: e.target.checked })
              }
            />
            <label htmlFor="IsAdmin"> Admin Access </label>
          </span>
          <button>Log in with Credentials</button>
        </form>

        {/* {state?.error && (
          <b style={{ color: "red", fontSize: "1.5rem" }}>{state.error}</b>
        )} */}
        {session?.user && (
          <b style={{ color: "green", fontSize: "1.5rem" }}>User Logged In</b>
        )}
        <Link href="/register">
          Don't have an account? <b>Register</b>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
