import React from "react";
import Link from "next/link";
import Img from "./Image";
import AppData from "../lib/appData.json";
import styles from "@/app/css/HomeOptions.module.css";

export default function HomeOptions() {
  const { storeOptions } = AppData;

  return (
    <ul className={styles.list}>
      {storeOptions.map((val) => {
        const { src, text } = val;

        return (
          <li key={text}>
            <Img imgSrc={src} imgAlt={text} imgWidth={24} imgHeight={24} />
            <div className={styles.details}>
              <div className={styles.info}>{text}</div>
              <div className={styles.link}>
                <Link href="https://github.com/AgeBK/ak-sports-shoes?tab=readme-ov-file#">
                  Find out more &gt;
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
