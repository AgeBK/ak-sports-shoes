"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCart } from "../slices/cartSlice";
import { getCart } from "../slices/cartUtils";
import { increment, decrement } from "@/app/slices/cartSlice";
import Img from "@/app/ui/Image";
import Button from "./Button";
import Price from "./Price";
// import ErrorMain from "./ErrorMain";
import { AddToCartProps } from "@/app/lib/definitions";
import { currency } from "../lib/utils";
import AppData from "../lib/appData.json";
import ImgFill from "./ImageFill";
import styles from "@/app/css/Cart.module.css";
import Link from "next/link";

export default function Cart() {
  const dispatch = useDispatch();
  let cart: AddToCartProps[] = useSelector(selectCart);
  const cartDetails = { total: 0, discounts: 0 };
  const { deliveryFee } = AppData;

  if (!cart.length) {
    cart = getCart(); // TODO: ?
  }

  const updateCart = (cartItems: AddToCartProps) =>
    dispatch(increment(cartItems));

  const getTotal = () =>
    currency(
      cartDetails.total -
        cartDetails.discounts +
        (cartDetails.total - cartDetails.discounts > 150 ? 0 : deliveryFee)
    );

  return (
    <>
      {cart?.length ? (
        <div className={styles.container}>
          <h2 className={styles.hdr}>My Items</h2>
          <div className={styles.details}>
            <div className={styles.items}>
              {cart?.map((cartItems: AddToCartProps) => {
                const {
                  id,
                  modelId,
                  category,
                  subCategory,
                  name,
                  brand,
                  price,
                  priceBeforeDiscount,
                  percentage,
                  shoeSize,
                  qty,
                } = cartItems;
                const img = `${modelId}-1.webp`;
                const link = `/${category}/${subCategory}/${id}`.toLowerCase(); // TODO: utils?
                cartDetails.total += priceBeforeDiscount * qty;
                cartDetails.discounts = cartDetails.discounts +=
                  (priceBeforeDiscount - price) * qty;

                return (
                  <div className={styles.itemContainer} key={id}>
                    <div className={styles.delete}>
                      <Button
                        css="cartBtn"
                        onClick={() =>
                          dispatch(decrement({ id, removeAll: true }))
                        }
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
                      <Link href={link}>
                        <ImgFill
                          imgSrc={img}
                          imgAlt={name}
                          imgStyle="cartImage"
                          imgPriority={true}
                        />
                      </Link>
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
                            onClick={() =>
                              dispatch(
                                decrement({
                                  id,
                                  removeAll: qty === 1 ? true : false,
                                })
                              )
                            }
                          >
                            -
                          </Button>
                        </div>
                        <span className={styles.amount}>{qty}</span>
                        <Button
                          css="cartBtn"
                          onClick={() => updateCart(cartItems)}
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
      ) : (
        <div className={styles.empty}>
          <h2>There is nothing in your cart</h2>
          <p>Looks like you haven’t added anything to your cart yet.</p>
          <p>
            Return <Link href="/">Home</Link> or use the navigation bar to
            continue.
          </p>
        </div>
      )}
    </>
  );
}
// else {
//   <ErrorMain message="An error occurred" />; // TODO:
// }
