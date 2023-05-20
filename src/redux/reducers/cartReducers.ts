import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../types/Products";
const initialState:Cart[] = [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item?.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id) as Cart;
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id)as Cart;
   
    if (item.quantity === 1) {
        const index = state.findIndex((item) => item.id === action.payload.id);
        state.splice(index, 1);
    } else {
        
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);     
      state.splice(index, 1);
    },

 
    updateCartAfterRefresh: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  updateCartAfterRefresh,
} = cartSlice.actions;

export default cartSlice.reducer;
