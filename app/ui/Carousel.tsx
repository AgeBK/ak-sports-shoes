"use client";

import React, { useEffect, useRef, useState } from "react";
import usePageWidth from "../hooks/usePageWidth";
import { DataProps } from "../lib/definitions";
import Img from "./Image";
import Button from "./Button";
import CarouselItem from "./CarouselItem";
import styles from "@/app/css/Carousel.module.css";

export default function Carousel({ data }: { data: DataProps[] }) {
  console.log("usePageWidth: " + usePageWidth());
  const [pageIndex, setPageIndex] = useState(0);
  const lastPageRef = useRef(0);
  const timeInterval = 3000;
  let items = 0;
  const screenWidth = usePageWidth();

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

  if (screenWidth) {
    // show either 4,3,2 items depending on screen width
    if (screenWidth > 1200) {
      items = 4;
    } else if (screenWidth > 930) {
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
      <CarouselItem data={pagedData} />
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
