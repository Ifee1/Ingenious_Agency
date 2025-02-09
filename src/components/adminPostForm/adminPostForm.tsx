"use client";

import React, { useActionState, useState } from "react";
import styles from "./adminPostForm.module.css";
import { addPost } from "@/lib/actions";
import { postFormData } from "@/app/types/types";

function AdminPostForm({ userId }: { userId: string }) {
  const [formData, setFormData] = useState<postFormData>({
    title: "",
    desc: "",
    userId: userId,
    slug: "",
  });
  const [state, formAction] = useActionState(addPost, undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // await registerUser(formData);
      await addPost({}, formData);
      // startTransition(() => {
      //   formAction(formData);
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Add New Post</h1>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              title: e.target.value,
            }))
          }
          placeholder="title"
        />

        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              slug: e.target.value,
            }))
          }
          placeholder="slug"
        />
        <input
          type="hidden"
          name="userId"
          value={formData.userId}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              userId: e.target.value,
            }))
          }
          placeholder="slug"
        />
        <textarea
          name="desc"
          id=""
          value={formData.desc}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              desc: e.target.value,
            }))
          }
          cols={10}
          rows={10}
        ></textarea>

        <button>Add</button>

        {state?.error && (
          <b style={{ color: "red", fontSize: "1.5rem" }}>{state.error}</b>
        )}
        {/* {state?.success && (
          <b style={{ color: "green", fontSize: "1.5rem" }}>{state.success}</b>
        )} */}
      </form>
    </div>
  );
}

export default AdminPostForm;
