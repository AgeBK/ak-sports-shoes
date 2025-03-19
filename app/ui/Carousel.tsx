"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DataProps } from "../lib/definitions";
import { sentenceCase } from "../lib/utils";
import Img from "./Image";
import Price from "./Price";
import styles from "@/app/css/Carousel.module.css";
import styles2 from "@/app/css/Products.module.css";
import Button from "./Button";

export default function Carousel({ data }: { data: DataProps[] }) {
  // show either 4,3,2 items depending on screen width
  console.log("Carousel");
  const [pageIndex, setPageIndex] = useState(0);
  const lastPageRef = useRef(0);
  const timeInterval = 3000;
  let items = 0;
  let screenWidth = 0;

  useEffect(() => {
    lastPageRef.current = data.length / items - 1;
    const id = setInterval(
      () =>
        lastPageRef.current === pageIndex
          ? setPageIndex(0)
          : setPageIndex(pageIndex + 1),
      timeInterval
    );
    return () => clearInterval(id);
  }, [pageIndex, timeInterval, data.length, items]);

  if (window) {
    screenWidth = window.innerWidth;
    if (screenWidth > 1134) {
      items = 4;
    } else if (screenWidth > 862) {
      items = 3;
    } else {
      items = 2;
    }
  }

  const pagedData = data.filter(
    (val, i) => i >= items * pageIndex && i < items * pageIndex + items
  );

  const handlePaging = (index: number) => {
    if (index > 0) {
      lastPageRef.current === pageIndex
        ? setPageIndex(0)
        : setPageIndex(pageIndex + index);
    } else {
      pageIndex === 0
        ? setPageIndex(lastPageRef.current)
        : setPageIndex(pageIndex + index);
    }
  };

  return (
    <div className={styles.container}>
      <Button css="carousel" onClick={() => handlePaging(-1)}>
        <Img
          imgSrc={"arrowLeft.png"}
          imgAlt={"back"}
          imgWidth={30}
          imgHeight={30}
        />
      </Button>
      <ul className={styles2.list}>
        {pagedData.map((val: DataProps, ind: number) => {
          const {
            id,
            name,
            category,
            subCategory,
            price,
            priceBeforeDiscount,
            percentage,
            modelId,
          } = val;
          const link = `/${category}/${subCategory}/${id}`.toLowerCase();
          const imageSrc = `${modelId}-2.webp`;
          return (
            <li className={styles2.listItem} key={ind}>
              <Link href={link}>
                <h3 className={styles2.name}>{sentenceCase(name)}</h3>
                <Img
                  imgSrc={imageSrc}
                  imgAlt={name}
                  imgWidth={240}
                  imgHeight={240}
                />
                <Price
                  price={price}
                  priceBeforeDiscount={priceBeforeDiscount}
                  percentage={percentage}
                />
              </Link>
            </li>
          );
        })}
      </ul>
      <Button css="carousel" onClick={() => handlePaging(1)}>
        <Img
          imgSrc={"arrowRight.png"}
          imgAlt={"forward"}
          imgWidth={30}
          imgHeight={30}
        />
      </Button>
    </div>
  );
}
