import { AddToCartProps, DataProps } from "./definitions";
import {
  fetchProductsByCategory,
  fetchProducstByCatSubCat,
} from "@/app/lib/data";

const sentenceCase = (s: string) => {
  if (s) {
    return s
      .toString()
      .replace(
        /\w\S*/g,
        (text: string) =>
          text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
      );
  }
  return s;
};

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const currency = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);

const fetchCategoryPageData = async (arg1: string, arg2?: string) => {
  let arr: DataProps[] = [];
  if (arg2?.toString()) {
    switch (arg1) {
      case "mens":
      case "womens":
      case "kids":
        arr = await fetchProducstByCatSubCat(
          sentenceCase(arg1),
          sentenceCase(arg2)
        );
        break;
      default:
        break;
    }
  } else {
    switch (arg1) {
      case "price-drop":
        arr = await fetchProductsPriceDrop();
        break;
      case "mens":
      case "womens":
      case "kids":
        arr = await fetchProductsByCategory(sentenceCase(arg1));
        break;
      default:
        break;
    }
  }
  return arr;
};

const camelise = (product: DataProps) => {
  // convert keys names in object from underscore to camel case (from db to React friendly)
  const camelCased = Object.entries(product).reduce((acc, val) => {
    const value = val[1];
    const key = val[0].replace(/_([a-z])/g, (str) => {
      return str[1].toUpperCase();
    });
    acc = { ...acc, [key]: value };
    return acc;
  }, {} as DataProps);
  return camelCased;
};

const cameliseArr = (products: DataProps[]) =>
  products.map((val) => camelise(val));

const deCamelise = (s: string) => {
  const result = s.replace(/([A-Z])/g, " $1"); // note: space before $
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const updateCart = (
  val: number,
  index: number,
  cart: AddToCartProps[],
  setCart: (cart: AddToCartProps[]) => void
) => {
  const newCart = [...cart];
  newCart[index].qty = newCart[index].qty + val;
  localStorage.setItem("AKShoesCart", JSON.stringify(newCart));
  setCart(newCart);
  // itemsInCart();
};

const deleteCart = (
  id: number,
  cart: AddToCartProps[],
  setCart: (cart: AddToCartProps[]) => void
) => {
  const newCart = cart.filter((val: AddToCartProps) => val.id !== id);
  localStorage.setItem("AKShoesCart", JSON.stringify(newCart));
  setCart(newCart);
};

// const itemsInCart = () => {
//   // JSON.parse(localStorage.getItem("AKShoesCart"))?.length;
//   const arr = JSON.parse(localStorage.getItem("AKShoesCart"));
//   const variable = arr.reduce((acc, val) => {
//     acc = acc + val.qty;
//     return acc;
//   }, 0);
//   console.log(variable);
//   return variable;
// };

export {
  fetchCategoryPageData,
  camelise,
  deCamelise,
  cameliseArr,
  sentenceCase,
  currency,
  updateCart,
  deleteCart,
  // itemsInCart,
};
