import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Products";
import { toast } from "react-toastify";
const initialState: Product[] = [];
const saveSlice = createSlice({
  name: "save",
  initialState,
  reducers: {
    saveItem: (state, action) => {
      const itemExists = state.find((item) => item?.id === action.payload.id);
      if (itemExists) {
        toast.warn("item already saved");
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
} = saveSlice.actions;

export default saveSlice.reducer;
