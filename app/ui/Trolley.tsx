import React from "react";
import { useSelector } from "react-redux";
import { selectCart } from "@/app/slices/cartSlice";
import Img from "./Image";
import Link from "next/link";
import { CartProps } from "../lib/definitions";
import styles from "@/app/css/Trolley.module.css";
import { getCartLocalStorage, countCartItems } from "../slices/cartUtils";

export default function Trolley() {
  let cart: CartProps = useSelector(selectCart);

  if (!cart.length) {
    cart = getCartLocalStorage();
  }

  const countItems = countCartItems(cart);
  const cartImage: string = countItems ? "cartNotEmpty" : "cartEmpty";

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.amount}>{countItems}</div>
        <Link href="/cart">
          <Img
            imgSrc={`${cartImage}.png`}
            imgAlt={"Cart"}
            imgWidth={28}
            imgHeight={28}
          />
        </Link>
      </div>
    </div>
  );
}
