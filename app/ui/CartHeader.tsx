import React, { useEffect } from "react";
import { itemsInCart } from "../lib/utils";
import Img from "./Image";
import Link from "next/link";
import styles from "@/app/css/CartHeader.module.css";

export default function CartHeader() {
  useEffect(() => {
    console.log("CartHeader");
  });

  const amount = itemsInCart();
  const cartImage: string = amount ? "cartNotEmpty" : "cartEmpty";

  return (
    <div className={styles.container}>
      <div className={styles.amount}>{amount}</div>
      <Link href="/cart">
        <Img
          imgSrc={`${cartImage}.png`}
          imgAlt={"Cart"}
          imgWidth={28}
          imgHeight={28}
        />
      </Link>
    </div>
  );
}
