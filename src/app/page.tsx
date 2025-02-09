import Image from "next/image";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Ingenious Talent Agency</h1>
        <p className={styles.desc}>You see Amatuers, We see Professionals.</p>

        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>
        <div className={styles.brands}>
          {/* <Image src="/brand1.png" alt="" fill className={styles.brandImg} /> */}
          <Image
            src="/brand2.png"
            alt=""
            sizes="300px"
            fill
            className={styles.brandImg}
          />
          {/* <Image src="/brand3.png" alt="" fill className={styles.brandImg} /> */}
          {/* <Image src="/brand4.png" alt="" fill className={styles.brandImg} /> */}
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/heroImg.png"
          alt=""
          sizes="300px"
          fill
          className={styles.heroImg}
        />
      </div>
    </div>
  );
}
