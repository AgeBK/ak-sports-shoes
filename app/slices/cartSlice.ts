import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { getCart, storeCart } from "./cartUtils";
import { AddToCartProps } from "../lib/definitions";

// interface AddToCartProps {
//   id: number;
//   modelId: number;
//   name: string;
//   brand: string;
//   price: number;
//   priceBeforeDiscount: number;
//   percentage: number;
//   shoeSize: string;
//   qty: number;
// }

interface CartProps {
  cart: AddToCartProps[];
}

const initialState: CartProps = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<AddToCartProps>) => {
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
      } = action.payload; // TODO: destructured, why?

      let { cart } = state;
      console.log(current(state.cart));

      if (!cart.length) {
        cart = getCart();
      }

      const itemInCart = cart?.find((val) => val.id === id);
      console.log(itemInCart);

      if (itemInCart) {
        state.cart = cart?.map((val) => {
          if (val.id === id) val.qty++;
          return val;
        });
      } else {
        state.cart.push({
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
        });
      }

      storeCart(state.cart as unknown as AddToCartProps);
      console.log(state.cart);
    },
    decrement: (
      state,
      action: PayloadAction<{ id: number; removeAll: boolean }>
    ) => {
      const { id, removeAll } = action.payload;
      console.log(current(state.cart));

      if (removeAll) {
        // remove item
        state.cart = state.cart.filter((val) => val.id !== id);
      } else {
        // reduce quantity by 1
        state.cart.map((val) => {
          if (val.id === id) val.qty--;
          return val;
        });
      }

      storeCart(state.cart as unknown as AddToCartProps);
    },
  },
});

export const { increment, decrement } = cartSlice.actions;

export const selectCart = (state: CartProps): CartProps["cart"] => state.cart; // TODO: check

export default cartSlice.reducer;
