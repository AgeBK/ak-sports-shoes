"use client";

import React from "react";
import Img from "@/app/ui/Image";
import Button from "./Button";
import Price from "./Price";
import styles from "@/app/css/Cart.module.css";
import { AddToCartProps } from "@/app/lib/definitions";
import ErrorMain from "./ErrorMain";

export default function Cart() {
  let cart =[];

  const updateCart = (val: number) => {
    console.log(val);
    console.log(typeof val);

    cart.qty = cart.qty + val;
    localStorage.setItem("AKShoesCart", JSON.stringify(cart));
  };

  if (localStorage) {
    const strCart = localStorage.getItem("AKShoesCart");
    if (strCart) {
      // cart exists
      cart = JSON.parse(strCart);
      console.log(cart);
    }
    return (
      <div className={styles.container}>
        <div className={styles.details}>
          <h2 className={styles.hdr}>My Items</h2>
          <div className={styles.product}>
            {cart.map((val: AddToCartProps) => {
              console.log("val");
              console.log(val);

              const {
                id,
                modelId,
                name,
                brand,
                price,
                priceBeforeDiscount,
                percentage,
                shoeSize,
                qty,
              } = val;
              const img = `${modelId}-1.webp`;
              return (
                <div className={styles.item} key={id}>
                  <div className={styles.img}>
                    <Img
                      imgSrc={img}
                      imgAlt={"todo"}
                      imgWidth={200}
                      imgHeight={200}
                    />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.price}>
                      <Price
                        price={price}
                        priceBeforeDiscount={priceBeforeDiscount}
                        percentage={percentage}
                      />
                    </div>
                    <b>{brand}</b>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.size}>
                      Size: <b>{shoeSize}</b>
                    </div>
                  </div>
                  <div className={styles.options}>
                    <Button css="cartBtn" onClick={() => updateCart(-1)}>
                      -
                    </Button>
                    <div className={styles.amount}>{qty}</div>
                    <Button css="cartBtn" onClick={() => updateCart(-1)}>
                      +
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.summaryContainer}>
            <div className={styles.summaryHeader}>Cart Summary</div>
            <div className={styles.summaryTable}>
              <div className={styles.summaryRow}>
                <div>Subtotal</div>
                <div>$350.00</div>
              </div>
              <div className={styles.summaryRow}>
                {/* <div>Item Discount</div>
                <div>-$40.00</div> */}
              </div>
              <div className={styles.summaryRow}>
                <div>Delivery</div>
                <div>Calculated at checkout</div>
              </div>
              <div className={styles.total}>
                <div>Total</div>
                <div>$XXXX.XX</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <ErrorMain message="An error occurred" />; // TODO:
  }
}
