import React from "react";
import styles from "./style/about.module.css";

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.description}>
        Welcome to Neon Mart – where tradition meets innovation. We are passionate about
        curating a selection of products that reflect timeless craftsmanship and modern design.
      </p>
      <p className={styles.description}>
        Our journey began with a deep respect for heritage and a commitment to quality.
        Whether you’re searching for traditional attire like our exquisite Jamdani sarees or
        Panjabi, or seeking the latest in modern electronics and lifestyle products, we bring you
        the best of both worlds.
      </p>
      <p className={styles.description}>
        At Neon Mart, we believe in delivering exceptional customer service and a seamless shopping
        experience. Every product in our store is carefully selected to ensure it meets the highest
        standards, blending classic elegance with contemporary trends.
      </p>
      <p className={styles.description}>
        Thank you for choosing Neon Mart. We invite you to explore our collection and experience the
        perfect balance between tradition and modernity.
      </p>
    </div>
  );
}
