import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { getCartLocalStorage, storeCartLocalStorage } from "./cartUtils";
import { AddToCartProps, CartProps } from "../lib/definitions";

const initialState: CartProps = {
  cart: [],
};

// TODO: remove logs
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
      if (!cart.length) {
        cart = getCartLocalStorage();
      }

      // check id and shoe size for match
      const itemInCart = cart?.find(
        (val) => val.id === id && val.shoeSize === shoeSize
      );

      if (itemInCart) {
        state.cart = cart?.map((val) => {
          if (val.id === id && val.shoeSize === shoeSize) val.qty++;
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
      storeCartLocalStorage(state.cart as unknown as AddToCartProps);
    },
    decrement: (
      state,
      action: PayloadAction<{
        id: number;
        removeAll: boolean;
        shoeSize: number;
      }>
    ) => {
      const { id, removeAll, shoeSize } = action.payload;
      if (removeAll) {
        // remove item
        state.cart = state.cart.filter(
          (val) => val.id !== id || val.shoeSize !== shoeSize
        );
      } else {
        // reduce quantity by 1
        state.cart.map((val) => {
          if (val.id === id && val.shoeSize === shoeSize) val.qty--;
          return val;
        });
      }
      storeCartLocalStorage(state.cart as unknown as AddToCartProps);
    },
  },
});

export const { increment, decrement } = cartSlice.actions;

export const selectCart = (state: CartProps): CartProps["cart"] => state.cart; // TODO: check

export default cartSlice.reducer;
