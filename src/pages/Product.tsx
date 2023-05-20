import React, { useEffect, useState } from "react";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";

import { FaHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BsFilter } from 'react-icons/bs'
import { addToCart } from "../redux/reducers/cartReducers";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { fetchAllProducts, sortProductsByCategory, sortProductsByPrice } from "../redux/reducers/productReducers";
import { saveItem } from "../redux/reducers/saveReducers";
const Product = () => {
  const {products} = useAppSelector((state) => state.productsReducer);
  

  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState("all");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };


  useEffect(() => {
    
    if (filter === "categories") {
      dispatch(sortProductsByCategory())
    } else if (filter === "price") {
         dispatch(sortProductsByPrice());
    } else {
      dispatch(fetchAllProducts())
    }
  }, [filter])

  return (
    <section>
      <div className="filter">
        <FormControl sx={{width: 100}}>
          <InputLabel id="demo-simple-select-label">Sort </InputLabel>
          <Select 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            
            value={filter}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="categories">Categories</MenuItem>
            <MenuItem value="price">Price</MenuItem>
           
          </Select>
        </FormControl>
      </div>
      <div className="product-container">
        {products.map((product) => {
          return (
            <div className="product-card">
              <Link to={`/product/${product.id}`}>
                <div className="product-tumb">
                  <img src={product.images[0]} alt="" />
                </div>
                <div className="product-details">
                  <span className="product-catagory">
                    {product.category.name}
                  </span>
                  <h4>
                    <a href="">{product.title}</a>
                  </h4>
                  <p>
                    {product.description.length > 40
                      ? product.description.substring(0, 40) + "..."
                      : product.description }
                  </p>
                  <div className="product-bottom-details">
                    <div className="product-price">
                      ${new Intl.NumberFormat("en-US").format(product.price)}
                    </div>
                  </div>
                </div>
              </Link>
              <div className="product-links">
                <button onClick={() => dispatch(addToCart(product))} className="add-btn">
                  <HiShoppingCart />
                </button>
                <button onClick={() => dispatch(saveItem(product))}>
                  <FaHeart />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Product;
