import { AddToCartProps } from "../lib/definitions";

const getCartLocalStorage = () => {
  // TODO: getting errors localStorage sometimes
  if (typeof localStorage !== "undefined") {
    const cart = localStorage?.getItem("AKShoesCart"); // TODO: check
    return cart ? JSON.parse(cart) : undefined;
  }
};

const storeCartLocalStorage = (cart: AddToCartProps) => {
  localStorage?.setItem("AKShoesCart", JSON.stringify(cart));
};

const countCartItems = (cart: AddToCartProps[]) => {
  const count = cart?.reduce((acc, val) => {
    acc = acc + val.qty;
    return acc;
  }, 0);
  return count;
};

export { storeCartLocalStorage, getCartLocalStorage, countCartItems };
