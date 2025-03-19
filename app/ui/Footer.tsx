import React from "react";
import Img from "./Image";
import styles from "@/app/css/Footer.module.css";

export default function Footer() {
  const yr = new Date().getFullYear();
  console.log(yr);

  return (
    <div className={styles.container}>
      <div className={styles.ak}>
        © {yr}{" "}
        <a
          href="https://github.com/AgeBK/ak-sports-shoes?tab=readme-ov-file#"
          target="_blank"
        >
          AK Sports Shoes
        </a>{" "}
        All rights reserved.
      </div>
      <ul className={styles.payments}>
        <li>
          <Img
            imgSrc={"applePay.png"}
            imgAlt={"Apple Pay"}
            imgWidth={60}
            imgHeight={30}
          />
        </li>
        <li>
          <Img
            imgSrc={"paypal.png"}
            imgAlt={"Pay Pal"}
            imgWidth={60}
            imgHeight={30}
          />
        </li>
        <li>
          <Img
            imgSrc={"mastercard.png"}
            imgAlt={"Master Card"}
            imgWidth={60}
            imgHeight={30}
          />
        </li>
        <li>
          <Img
            imgSrc={"afterPay.png"}
            imgAlt={"After Pay"}
            imgWidth={60}
            imgHeight={30}
          />
        </li>
        <li>
          <Img
            imgSrc={"visa.png"}
            imgAlt={"Visa"}
            imgWidth={60}
            imgHeight={30}
          />
        </li>
        <li>
          <Img
            imgSrc={"AE.png"}
            imgAlt={"American Express"}
            imgWidth={60}
            imgHeight={30}
          />
        </li>
      </ul>
    </div>
  );
}
