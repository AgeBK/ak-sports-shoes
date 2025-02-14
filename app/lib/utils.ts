import { DataProps } from "./definitions";
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchProducstByCatSubCat,
  fetchProductsPriceDrop,
  fetchProductById,
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

// export const formatCurrency = (amount: number) => {
//   return (amount / 100).toLocaleString("en-US", {
//     style: "currency",
//     currency: "USD",
//   });
// };

const currency = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);

const fetchCategoryPageData = async (arg1: string, arg2?: string) => {
  console.log("arg1");
  console.log(arg1);

  let test = [];
  let test2 = [];
  if (arg1) {
    test2 = await fetchProductById(arg1);
  } else {
    console.log("arg1 supplied");
    test = await fetchProducts();
  }
  return test.length > 0 ? test : test2;
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

export {
  fetchCategoryPageData,
  // sentenceCase,
  camelise,
  deCamelise,
  cameliseArr,
  sentenceCase,
  currency,
};
