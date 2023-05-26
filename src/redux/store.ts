import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productReducers";
import cartReducers from "./reducers/cartReducers";
import userReducers from "./reducers/userReducer";
import favoriteReducers from "./reducers/favoriteReducers";
import categoryReducers from "./reducers/categoryReducers";
const store = configureStore({
  reducer: {
    productsReducer,
    cartReducers,
    userReducers,
    favoriteReducers,
    categoryReducers,
  },
});

// store.getState : return the whole global state value

/* type GlobalState = {
    productsReducer: Product[],
    usersReducer: User[]
} */
export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; //type of dispatch method from redux store
export default store;
