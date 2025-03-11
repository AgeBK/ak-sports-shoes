import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { getCart, storeCart } from "./cartUtils";

interface AddToCartProps {
  id: number;
  modelId: string;
  name: string;
  brand: string;
  price: number;
  priceBeforeDiscount: number;
  percentage: number;
  shoeSize: string;
  qty: number;
}

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
    increment: (
      state,
      action: PayloadAction<{ cartItems: AddToCartProps }>
    ) => {
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
          name,
          brand,
          price,
          priceBeforeDiscount,
          percentage,
          shoeSize,
          qty,
        });
      }

      storeCart(state.cart);
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

      storeCart(state.cart);
    },

    restoreCart: (state, action: PayloadAction<AddToCartProps[]>) => {
      state.cart = action.payload;
    },
  },
});

export const { increment, decrement, restoreCart } = cartSlice.actions;

export const selectCart = (state: CartProps): CartProps["cart"] => state.cart; // TODO: check

export default cartSlice.reducer;
