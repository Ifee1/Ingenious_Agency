import React from "react";
import styles from "./footer.module.css";

function footer() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>InGeNious</div>
      <div className={styles.text}>Talent Extraodinaire</div>
    </div>
  );
}

export default footer;
