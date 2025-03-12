"use client";

import Link from "next/link";
import Img from "./Image";
import Nav from "./Nav";
import BreadCrumb from "./BreadCrumb";
import Trolley from "./Trolley";
import styles from "@/app/css/Header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.ak}>
            <Link href="/">
              <Img
                imgSrc="AKlogo.webp"
                imgAlt="AK Sports Store"
                imgWidth={160}
                imgHeight={35}
              />
            </Link>
          </div>
        </div>
        <div className={styles.lge}>
          <Nav />
        </div>
        <Trolley />
      </div>
      <div className={styles.sml}>
        <Nav />
      </div>
      <div className={styles.subHdr}>
        <BreadCrumb />
      </div>
    </header>
  );
}
