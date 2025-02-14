import Image from "next/image";
import { Suspense, use } from "react";
import { sentenceCase } from "../lib/utils";
import Link from "next/link";
import Price from "./price";
import Img from "./image";
import { DataProps } from "../lib/definitions";
import styles from "../page.module.css";

export default function Product({ promise }) {
  // const products = await fetchCategoryPageData();

  const products = use(promise);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {products.map((val: DataProps, ind: number) => {
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
          const img = `${modelId}-1.webp`;
          // const imageSrc =
          //   hover && item === modelId ? `${modelId}-2.webp` : `${modelId}-1.webp`;
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
                  imgSrc={img}
                  imgAlt={name}
                  imgWidth={200}
                  imgHeight={200}
                  imgPriority={false}
                />
                <Price
                  price={price}
                  priceBeforeDiscount={priceBeforeDiscount}
                  percentage={percentage}
                />

                {/* <Image
              className={styles.logo}
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            /> */}
                {/* <Price
              price={price}
              priceBeforeDiscount={priceBeforeDiscount}
              percentage={percentage}
              css="Products"
            /> */}
              </Link>
              <div>{modelId}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
