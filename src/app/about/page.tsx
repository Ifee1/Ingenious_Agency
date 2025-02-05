import Image from "next/image";
import React from "react";
import styles from "./about.module.css";

function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <p className={styles.subTitle}>About Ingenious</p>
        <h1 className={styles.title}>
          Our Agency: A Hub for Creativity, Innovation, and Excellence
        </h1>
        <p className={styles.desc}>
          With passion, expertise, and a commitment to excellence, we guide
          artists toward success. By amplifying their voices, we shape the
          future of entertainment.
        </p>

        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10K+</h1>
            <p>Years of Experience</p>
          </div>
          <div className={styles.box}>
            <h1>250K+</h1>
            <p>Talents Discovered</p>
          </div>
          <div className={styles.box}>
            <h1>700K+</h1>
            <p>Community Initiatives</p>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image src="/about.jpeg" alt="" fill className={styles.Img} />
      </div>
    </div>
  );
}

export default AboutPage;
