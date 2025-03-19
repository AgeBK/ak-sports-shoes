import React from "react";
import Img from "./Image";
import AppData from "../lib/appData.json";
import styles from "@/app/css/Footer.module.css";

export default function Footer() {
  const yr = new Date().getFullYear();
  const { payOptions } = AppData;
  console.log(yr);

  return (
    <div className={styles.container}>
      <div className={styles.ak}>
        © {yr}{" "}
        <a
          href="https://github.com/AgeBK/ak-sports-shoes?tab=readme-ov-file#"
          target="_blank"
        >
          AK Sports Shoes
        </a>
        All rights reserved.
      </div>
      <ul className={styles.payments}>
        {payOptions.map((val) => {
          const { src, alt } = val;
          return (
            <li key={alt}>
              <Img imgSrc={src} imgAlt={alt} imgWidth={50} imgHeight={24} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
