"use client";

import { use, useState } from "react";
import Link from "next/link";
import Img from "@/app/ui/image";
import Price from "./price";
import Paging from "./Paging";
import appData from "../lib/appData.json";
import { DataProps } from "../lib/definitions";
import { sentenceCase } from "../lib/utils";
import styles from "@/app/css/Products.module.css";

export default function Products({
  promise 
}: {
  promise: Promise<DataProps[]>;

}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [hover, setHover] = useState(false);
  const [item, setItem] = useState(0);
  const data: DataProps[] = use(promise);
  const { pageLimit } = appData;
  let pagedData = [];

  // const handleHover = (isHover: boolean, modelId: number) => {
  //   setHover(isHover);
  //   setItem(modelId);
  // };

  const handlePaging = (page: number) => {
    window.scrollTo(0, 0); // TODO:
    setCurrentPage(page);
  };
  pagedData = data.filter(
    (val, i) =>
      i >= currentPage * pageLimit && i < (currentPage + 1) * pageLimit
  );

  return (
    <>
      <div className={styles.itemCount}>{data.length} results</div>
      <ul className={styles.list}>
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
          const imageSrc =
            hover && item === modelId
              ? `${modelId}-2.webp`
              : `${modelId}-1.webp`;

          return (
            <li
              className={styles.listItem}
              key={ind}
              // onMouseEnter={() => handleHover(true, modelId)}
              // onMouseLeave={() => handleHover(false, 0)}
            >
              <Link href={link}>
                <h3 className={styles.name}>{sentenceCase(name)}</h3>
                <Img
                  imgSrc={imageSrc}
                  imgAlt={name}
                  imgWidth={200}
                  imgHeight={200}
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
      <Paging
        products={data}
        pageLimit={pageLimit}
        currentPage={currentPage}
        handlePaging={handlePaging}
      />
    </>
  );
}
