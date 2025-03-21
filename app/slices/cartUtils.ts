import { AddToCartProps } from "../lib/definitions";

const getCart = () => {
  if (localStorage) {
    const cart = localStorage?.getItem("AKShoesCart"); // TODO: check
    return cart ? JSON.parse(cart) : undefined;
  }
};

const storeCart = (cart: AddToCartProps) => {
  localStorage?.setItem("AKShoesCart", JSON.stringify(cart));
};

const countCartItems = (cart: AddToCartProps[]) => {
  const count = cart?.reduce((acc, val) => {
    acc = acc + val.qty;
    return acc;
  }, 0);

  console.log(count);
  return count;
};

export { storeCart, getCart, countCartItems };
