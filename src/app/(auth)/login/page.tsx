"use client";

import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { signIn, useSession } from "next-auth/react";
import { LoginUser } from "@/app/types/types";
import { loginUser } from "../../../../lib/actions";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

async function gitHubSignUp() {
  await signIn("github");
}

function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(loginUser, undefined);

  const [formData, setFormData] = useState<LoginUser>({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (state?.success) {
      const timeout = setTimeout(function () {
        router.push("/");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [state?.success, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      startTransition(() => {
        formAction(formData);
      });
      // await loginUser(formData);
    } catch (error) {
      console.log(error);
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
          <button>Log in with Credentials</button>
        </form>

        {state?.error && (
          <b style={{ color: "red", fontSize: "1.5rem" }}>{state.error}</b>
        )}
        {state?.success && (
          <b style={{ color: "green", fontSize: "1.5rem" }}>{state.message}</b>
        )}
        <Link href="/register">
          Don't have an account? <b>Register</b>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
