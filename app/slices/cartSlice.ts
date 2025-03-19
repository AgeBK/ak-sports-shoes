import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { getCart, storeCart } from "./cartUtils";
import { AddToCartProps, CartProps } from "../lib/definitions";

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

      // check id and shoe size for match
      const itemInCart = cart?.find(
        (val) => val.id === id && val.shoeSize === shoeSize
      );

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
