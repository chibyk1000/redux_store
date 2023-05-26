import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Category } from "../../types/Products";
import axios, { AxiosError } from "axios";



export const fetchAllCategories = createAsyncThunk(
  "getAllCategories",
  async () => {
    try {
      const result = await axios.get<Category[]>(
        "https://api.escuelajs.co/api/v1/categories"
      );

      return result.data; // returned result would be inside action.payload
    } catch (e) {
      const error = e as AxiosError;
      if (error.request) {
        console.log("error in request: ", error.request);
      } else {
        console.log(error.response?.data);
      }
    }
  }
);

const initialState: Category[] = []



export const categorySlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchAllCategories.fulfilled, (state, action) => {
      if (action.payload) {
       return action.payload;
      }
    });
   
  
    
  },
});

const categoryReducers = categorySlice.reducer;
export default categoryReducers;