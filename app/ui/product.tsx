"use client";

import styles from "@/app/css/Product.module.css";
import Img from "./image";
import ImgFill from "./ImageFill";
import Price from "./price";
import appData from "../lib/appData.json";
import { camelise, currency, sentenceCase } from "../lib/utils";
import { use, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { DataProps } from "../lib/definitions";

type ProductProps = {
  promise: Promise<DataProps>;
};

export default function Product({ promise }: ProductProps) {
  const [shoeSize, setShoeSize] = useState(0);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState<JSX.Element>();
  let data: DataProps = use(promise);

  if (data) {
    data = camelise(data); // convert db column names to camel case (eg: price_normal to priceNormal)
    const { shoeSizes, delivery } = appData;
    const {
      modelId,
      name,
      brand,
      available,
      catchLine,
      colour,
      components,
      // designFor,
      gender,
      productNature,
      price,
      priceBeforeDiscount,
      percentage,
      size,
      sport,
    } = data;
    const imgShoe1 = `${modelId}-1.webp`;
    const imgShoe2 = `${modelId}-2.webp`;
    const imgSizeChart: JSX.Element = (
      <Img
        imgSrc={"SizeChart.webp"}
        imgAlt={"Size chart"}
        imgWidth={600}
        imgHeight={600}
      />
    );

    const handleChart = () => {
      setShow(true);
      setItem(imgSizeChart);
    };

    const test = () => {
      console.log("test");
    };

    const handleShoeSize = (val: number) => {
      if (shoeSize === val) {
        setShoeSize(0);
      } else {
        setShoeSize(val);
      }
    };

    return (
      <div className={styles.container}>
        <div className={styles.imgs}>
          <ImgFill
            imgSrc={imgShoe1}
            imgAlt={name}
            imgStyle="productShoe"
            imgPriority={true}
          />
          <ImgFill
            imgSrc={imgShoe2}
            imgAlt={name}
            imgStyle="productShoe"
            imgPriority={true}
          />
        </div>
        <div className={styles.description}>
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
                    imgSrc={"measuringTape.svg"}
                    imgAlt={"imgSizeChart"}
                    imgWidth={30}
                    imgHeight={25}
                  />
                </div>
              </div>
              <Button onClick={handleChart} css="chart">
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
            <ul className={styles.deliveryList}>
              {delivery.map((val) => {
                const { text, img } = val;
                return (
                  <li key={text}>
                    <Img
                      imgSrc={img}
                      imgAlt={text}
                      imgWidth={40}
                      imgHeight={40}
                    />
                    <div className={styles.deliveryText}>{text}</div>
                  </li>
                );
              })}
            </ul>
            <div className={styles.infoBlock}>
              <h3>Features</h3>
              <div>{components}</div>
            </div>
            <div className={styles.infoBlock}>
              <h3>Product Details</h3>
              <ul className={styles.details}>
                <li>
                  <b>Brand:</b> <span>{sentenceCase(brand)}</span>
                </li>
                <li>
                  <b>Sport:</b> <span>{sentenceCase(sport.join(", "))}</span>
                </li>
                <li>
                  <b>Gender:</b> <span>{sentenceCase(gender.join(", "))}</span>
                </li>
                <li>
                  <b>Product Nature:</b>
                  <span>{sentenceCase(productNature)}</span>
                </li>
                <li>
                  <b>Available:</b>
                  <span> {available ? "In stock" : "Out of stock"}</span>
                </li>
                {colour && (
                  <li>
                    <b>Colour:</b> <span> {sentenceCase(colour)}</span>
                  </li>
                )}
              </ul>
              {show ? (
                <Modal show={show} setShow={setShow}>
                  {item}
                </Modal>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Error</h1>;
  }
}
