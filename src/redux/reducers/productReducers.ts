import {PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Category, Product } from "../../types/Products";
import axios, {AxiosError} from "axios";
import { toast } from "react-toastify";




export const fetchAllProducts = createAsyncThunk("fetchProducts", async () => {
  try {
    const result = await axios.get<Product[]>(
      "https://api.escuelajs.co/api/v1/products"
    );
    
    return result.data; // returned result would be inside action.payload
  } catch (e) {
    const error = e as AxiosError | any;
    if (error.request) {
        toast.error(error.response?.data?.message);
      console.log("error in request: ", error.request);
    } else {
      console.log(error.response?.data);
    }
  }
});


export const fetchSingleProduct = createAsyncThunk('getSingleProduct', async (id:string) => {
  try {
     const result = await axios.get<Product>(
       "https://api.escuelajs.co/api/v1/products/"+id
     );

     return result.data;
  } catch (e) {
    console.log(e);
    
    const error = e as AxiosError | any;
    if (error.request) {
        toast.error(error.response?.data?.message);
      console.log("error in request: ", error.request);
    } else {
      console.log(error.response?.data);
    }
  }
})


export const fetchAllCategories = createAsyncThunk("getAllCategories", async () => {
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
})


export const createNewProduct = createAsyncThunk('createNewProduct', async (data:Product) => {
     try {
       const result = await axios.post<Product>(
         "https://api.escuelajs.co/api/v1/products", data
       );

       return result.data; // returned result would be inside action.payload
     } catch (e) {
       const error = e as AxiosError |any;
       if (error.request) {
           toast.error(error.response?.data?.message);
         console.log("error in request: ", error.request);
       } else {
         console.log(error.response?.data);
       }
     }
})


export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (data:any) => {
    try {
      const result = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${data.id}`,
        data
      );
      return result.data; // returned result would be inside action.payload
    } catch (e) {
      const error = e as AxiosError | any;
      if (error.request) {
          toast.error(error.response?.data?.message);
        console.log("error in request: ", error.request);
      } else {
        console.log(error.response?.data);
      }
    }
  }
);


export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id:string) => {
    try {
      const result = await axios.delete(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        
      );

      return result.data; // returned result would be inside action.payload
    } catch (e) {
      const error = e as AxiosError | any;
      if (error.request) {
          toast.error(error.response?.data?.message);
        console.log("error in request: ", error.request);
      } else {
        console.log(error.response?.data);
      }
    }
  }
);

interface Products{
  products: Product[]
  product: Product| null
  categories: Category[]
}

const initialState: Products = {
  product: { id: 0, category: { id: 0, name: "", creationAt: "", image: "", updatedAt: "" }, creationAt: "", description: "", images: [], price: 0, title: "", updatedAt: "" },
  categories: [],
  products:[]
};

/* createSlice() returns 1 object {
    reducer, action, ...
} */
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortProductsByCategory: (state) => {
      const sorted = [...state.products].sort((a, b) => {
        if (a.category.id < b.category.id) return -1;
        if (a.category.id > b.category.id) return 1;
        return 0;
      });

      state.products = sorted;
    },

    sortProductsByPrice: (state) => {
      const sorted = [...state.products].sort((a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
      });

      state.products = sorted;
    },
  }, // list of methods to modify the state
  extraReducers: (build) => {
    build
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        if (action.payload) {
          state.products = action.payload;
        }
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        if (action.payload) {
          state.product = action.payload;
        }
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        if (action.payload) {
          state.categories = action.payload;
        }
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        if (action.payload) {
          toast.success("product created successfully");
        }
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (action.payload) {
          toast.success("product updated");
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload) {
          toast.success("product deleted");
        }
      });
  },
});

//productReducer: current state
const productsReducer = productsSlice.reducer;
export const {sortProductsByCategory, sortProductsByPrice} =  productsSlice.actions
export default productsReducer;
