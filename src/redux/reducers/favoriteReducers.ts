import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Products";
import { toast } from "react-toastify";
const initialState: Product[] = [];
const favoriteSlice = createSlice({
  name: "save",
  initialState,
  reducers: {
    saveItem: (state, action) => {
      const itemExists = state.find((item) => item?.id === action.payload.id);
      if (itemExists) {
       const index = state.findIndex((item) => item.id === action.payload.id);
       state.splice(index, 1);
       toast.success("item removed");
      } else {
        toast.success("item saved");
        state.push({ ...action.payload });
      }
    },

    removeItem: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
        state.splice(index, 1);
        toast.success('item removed');
    },

    updateCartAfterRefresh: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const {
  saveItem,

  removeItem,
  updateCartAfterRefresh,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
