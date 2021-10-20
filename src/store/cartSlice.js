import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [] },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push({ variantId: action.payload, quantity: 1 });
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
