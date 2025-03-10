"use client";

import React, { useEffect, useState } from "react";
import Img from "@/app/ui/Image";
import Button from "./Button";
import Price from "./Price";
// import ErrorMain from "./ErrorMain";
import { AddToCartProps } from "@/app/lib/definitions";
import { currency, updateCart, deleteCart } from "../lib/utils";
import AppData from "../lib/appData.json";
import ImgFill from "./ImageFill";
import styles from "@/app/css/Cart.module.css";

export default function Cart() {
  const [cart, setCart] = useState<AddToCartProps[]>([]);
  const cartDetails = { total: 0, discounts: 0 };
  const { deliveryFee } = AppData;

  useEffect(() => {
    const strCart = localStorage.getItem("AKShoesCart");
    if (strCart) {
      // cart exists, store in state
      setCart(JSON.parse(strCart));
    }
  }, []);

  const getTotal = () =>
    currency(
      cartDetails.total -
        cartDetails.discounts +
        (cartDetails.total - cartDetails.discounts > 150 ? 0 : deliveryFee)
    );

  return (
    <div className={styles.container}>
      <h2 className={styles.hdr}>My Items</h2>
      <div className={styles.details}>
        <div className={styles.items}>
          {cart.map((val: AddToCartProps, i: number) => {
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
            cartDetails.total += priceBeforeDiscount * qty;
            cartDetails.discounts = cartDetails.discounts +=
              (priceBeforeDiscount - price) * qty;

            return (
              <div className={styles.itemContainer} key={id}>
                <div className={styles.delete}>
                  <Button
                    css="cartBtn"
                    onClick={() => deleteCart(id, cart, setCart)}
                  >
                    <Img
                      imgSrc={"bin.svg"}
                      imgAlt={"Delete"}
                      imgWidth={14}
                      imgHeight={14}
                    />
                    Delete
                  </Button>
                </div>
                <div className={styles.item}>
                  <div className={styles.img}>
                    <ImgFill
                      imgSrc={img}
                      imgAlt={name}
                      imgStyle="cartImage"
                      imgPriority={true}
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
                    <div className={styles.remove}>
                      <Button
                        css="cartBtn"
                        // disabled={qty < 1}
                        onClick={() =>
                          qty === 1
                            ? deleteCart(id, cart, setCart)
                            : updateCart(-1, i, cart, setCart)
                        }
                      >
                        -
                      </Button>
                    </div>
                    <span className={styles.amount}>{qty}</span>
                    <Button
                      css="cartBtn"
                      onClick={() => updateCart(1, i, cart, setCart)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.summaryContainer}>
          <div className={styles.summary}>
            <h2 className={styles.hdr}>Cart Summary</h2>
            <div>Free delivery on all orders over $150</div>
            <div className={styles.tbl}>
              <div className={styles.row}>
                <div>Subtotal</div>
                <div>{currency(cartDetails.total)}</div>
              </div>
              <div className={styles.row}>
                <div>Item Discount</div>
                <div>-{currency(cartDetails.discounts)}</div>
              </div>
              <div className={styles.row}>
                <div>Delivery</div>
                <div>
                  {cartDetails.total - cartDetails.discounts > 150
                    ? 0
                    : `$${deliveryFee}`}
                </div>
              </div>
              <div className={styles.total}>
                <div>Total</div>
                <div>{getTotal()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <h3>TODO: Carousel here??</h3> */}
    </div>
  );
}
// else {
//   <ErrorMain message="An error occurred" />; // TODO:
// }
