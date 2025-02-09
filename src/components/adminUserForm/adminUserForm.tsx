"use client";

import React, { useActionState, useState } from "react";
import styles from "./adminUserForm.module.css";
import { addUser } from "@/lib/actions";
import { RegisterUser } from "@/app/types/types";

function AdminUserForm() {
  const [formData, setFormData] = useState<RegisterUser>({
    username: "",
    email: "",
    password: "",
    img: "",
    isAdmin: undefined,
  });
  const [state, formAction] = useActionState(addUser, undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addUser({}, formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Add New User</h1>
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

        <select name="isAdmin" id="">
          <option value="false">Is Admin?</option>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>

        <button>Add User</button>

        {/* {state?.error && (
          <b style={{ color: "red", fontSize: "1.5rem" }}>{state.error}</b>
        )} */}
        {/* {state?.success && (
          <b style={{ color: "green", fontSize: "1.5rem" }}>{state.success}</b>
        )} */}
      </form>
    </div>
  );
}

export default AdminUserForm;
