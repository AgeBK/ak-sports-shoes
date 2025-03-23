import React from "react";
import { DataProps } from "../lib/definitions";
import Link from "next/link";
import { sentenceCase } from "../lib/utils";
import Img from "./Image";
import Price from "./Price";
import styles2 from "@/app/css/Products.module.css";

export default function CarouselItem({ data }: { data: DataProps[] }) {
  return (
    <ul className={styles2.list}>
      {data.map((val: DataProps, ind: number) => {
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
        const imageSrc = `${modelId}-1.webp`;
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
  );
}
