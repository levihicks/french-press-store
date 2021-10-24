import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [] },
  reducers: {
    addToCart: (state, action) => {
      const product = { ...action.payload };
      if (!state.cart.find((el) => el.variantId === product.variantId)) {
        state.cart.push({
          variantId: product.variantId,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1,
        });
      } else {
        state.cart = state.cart.map((el) => {
          if (el.variantId === product.variantId) {
            return { ...el, quantity: el.quantity + 1 };
          } else return el;
        });
      }
    },
    editQuantity: (state, action) => {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].variantId === action.payload.variantId) {
          if (action.payload.newQuantity > 0)
            state.cart[i].quantity = action.payload.newQuantity;
          break;
        }
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.variantId !== action.payload
      );
    },
  },
});

export const { addToCart, editQuantity, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
