"use client";

import styles from "@/app/css/Product.module.css";
import Img from "./image";
import Price from "./price";
import appData from "../lib/appData.json";
import { currency, sentenceCase } from "../lib/utils";
import { use, useState } from "react";
import Button from "./Button";

export default function Product({ promise }) {
  const [shoeSize, setShoeSize] = useState(0);
  const data = use(promise);
  const { shoeSizes, delivery } = appData;

  const {
    modelId,
    name,
    brand,
    available,
    catchLine,
    colour,
    components,
    designFor,
    gender,
    productNature,
    price,
    priceBeforeDiscount,
    percentage,
    size,
    sport,
  } = data;

  const shoe1 = `${modelId}-1.webp`;
  const shoe2 = `${modelId}-2.webp`;

  const test = () => {
    console.log("test");
  };
  const handleShoeSize = (val: number) => {
    console.log(val);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgs}>
        <Img
          imgSrc={shoe1}
          imgAlt={name}
          imgWidth={400}
          imgHeight={400}
          imgPriority={false}
        />
        <Img
          imgSrc={shoe2}
          imgAlt={name}
          imgWidth={400}
          imgHeight={400}
          imgPriority={false}
        />
      </div>
      <div>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.infoBlock}>{catchLine}</div>
        <Price
          price={price}
          priceBeforeDiscount={priceBeforeDiscount}
          percentage={percentage}
          css="product"
        />
        <div className={styles.afterPay}>
          Or 4 interest free payments of {currency(price / 4)}
        </div>
        <div className={styles.infoBlock}>
          <div className={styles.sizeHdr}>
            <h3 className={styles.hdr}>Select size</h3>
            <div className={styles.chart}>
              <div className={styles.sizeImg}>
                <Img
                  imgSrc={"sizeIco.svg"}
                  imgAlt={"sizeChart"}
                  imgWidth={30}
                  imgHeight={25}
                />
              </div>
            </div>
            <Button onClick={test} css="chart">
              View size chart
            </Button>
          </div>
          <div className={`${styles.sizes} ${styles.infoBlock}`}>
            {shoeSizes.map((val: number) => {
              const available = size.indexOf(val) > -1;
              return (
                <button
                  className={`${styles.shoeSizes} ${
                    available ? styles.available : styles.strike
                  }  ${shoeSize === val ? styles.selected : ""}`}
                  key={val}
                  onClick={() => handleShoeSize(val)}
                  disabled={!available}
                >
                  {val}
                </button>
              );
            })}
          </div>
          <Button onClick={test} css="cart">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
