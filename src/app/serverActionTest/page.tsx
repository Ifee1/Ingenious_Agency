"use client";

import React, { useState } from "react";
import { addPost, deletePost } from "../../../lib/actions";
import Image from "next/image";
import { postFormData } from "../types/types";

function ServerActionTestPage() {
  const [formData, setFormData] = useState<postFormData>({
    title: "",
    desc: "",
    slug: "",
    userId: "",
    id: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addPost(formData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await deletePost(formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          name="desc"
          value={formData.desc}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              desc: e.target.value,
            }))
          }
          placeholder="description"
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
          type="text"
          name="userId"
          value={formData.userId}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              userId: e.target.value,
            }))
          }
          placeholder="userId"
        />
        {/* <Image /> */}
        <button>Create New Post</button>
      </form>

      <form onSubmit={handleDelete}>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              id: e.target.value,
            }))
          }
          placeholder="postId"
        />
        <button>delete</button>
      </form>
    </div>
  );
  33;
}

export default ServerActionTestPage;
