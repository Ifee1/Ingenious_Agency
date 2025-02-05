import Image from "next/image";
import React from "react";
import styles from "./contact.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact_Talent_Agency",
  description: "Contact description",
};

function ContactPage() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="/contactUs.png"
          alt=""
          priority
          fill
          sizes="300px"
          className={styles.Img}
        />
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="eail" placeholder="Email Address" />
          <input type="phone" placeholder="Phone Number" />
          <textarea
            name=""
            id=""
            defaultValue="Your Message"
            cols={10}
            rows={10}
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
