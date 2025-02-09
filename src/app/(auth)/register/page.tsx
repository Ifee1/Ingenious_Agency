"use client";

import { RegisterUser } from "@/app/types/types";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
// import { registerUser } from "../../../../lib/actions";
import styles from "./register.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions";

function RegisterPage() {
  const [formData, setFormData] = useState<RegisterUser>({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    isAdmin: undefined,
  });

  const [state, formAction] = useActionState(registerUser, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      const timeout = setTimeout(function () {
        router.push("/login");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [state?.success, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // await registerUser(formData);
      // await registerUser({}, formData);
      startTransition(() => {
        formAction(formData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                email: e.target.value,
              }))
            }
            placeholder="email"
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
          <input
            type="password"
            name="passwordRepeat"
            value={formData.passwordRepeat}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                passwordRepeat: e.target.value,
              }))
            }
            placeholder="password again"
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

          <button>Register</button>

          {state?.error && (
            <b style={{ color: "red", fontSize: "1.5rem" }}>{state.error}</b>
          )}
          {state?.success && (
            <b style={{ color: "green", fontSize: "1.5rem" }}>
              {state.success}
            </b>
          )}
          <Link href="/login">
            Have an account? <b>Login</b>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
