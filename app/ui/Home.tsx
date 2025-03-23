import React from "react";
import Link from "next/link";
import CarouselMain from "./CarouselMain";
import AppData from "../lib/appData.json";
import ImgFill from "./ImageFill";
import HomeOptions from "./HomeOptions";
import styles from "@/app/css/Home.module.css";

export default function Home() {
  const { navItems } = AppData;
  return (
    <div className={styles.container}>
      <h2 className={styles.home}>Hot Specials</h2>
      <CarouselMain />
      <HomeOptions />
      <div className={styles.cats}>
        <h2>Categories</h2>
        <ul className={styles.list}>
          {navItems.map((val) => (
            <li key={val}>
              <Link href={`/${val.toLowerCase()}`}>
                <ImgFill
                  imgSrc={`${val.toLowerCase()}.jpg`}
                  imgAlt={val}
                  imgStyle="homePageCat"
                  imgPriority={true}
                />
                <h2>{val}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
