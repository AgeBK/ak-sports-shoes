import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "@/app/slices/cartSlice";
import Img from "./Image";
import Link from "next/link";
import { CartProps } from "../lib/definitions";
import styles from "@/app/css/CartHeader.module.css";
import { getCart, countCartItems } from "../slices/cartUtils";

export default function CartHeader() {
  let cart: CartProps = useSelector(selectCart);
  const { qty } = cart;
  console.log(cart);
  console.log(qty);

  if (!cart.length) {
    cart = getCart();
  }

  const countItems = countCartItems(cart);
  console.log(countItems);

  const cartImage: string = countItems ? "cartNotEmpty" : "cartEmpty";

  return (
    <div className={styles.container}>
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
  );
}
