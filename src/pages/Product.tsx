import React, { useEffect, useState } from "react";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";

import { FaHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BsFilter } from 'react-icons/bs'
import { addToCart } from "../redux/reducers/cartReducers";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Card, CardActionArea,CardMedia, CardContent, Typography, CardActions, IconButton, Button } from "@mui/material";
import { fetchAllProducts, sortProductsByCategory, sortProductsByPrice } from "../redux/reducers/productReducers";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
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
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
      gap:'1rem'
      }}>
        {products.map((product) => {
          return (
            <Card sx={{ maxWidth: 345, position: "relative" }}>
              <CardMedia
                component="img"
                height="194"
                image={product.images[0]}
                alt={product.title}
              />
              <CardContent sx={{ height: "8rem" }}>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <IconButton
                aria-label="add to favorites"
                sx={{ position: "absolute", top: 0 }}
              >
                <FavoriteIcon />
              </IconButton>
              <CardActions disableSpacing>
                <Button
                  endIcon={<HiShoppingCart />}
                  sx={{
                    backgroundColor: "#fbb72c",
                    width: "100%",
                    color: "white",
                  }}
                >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          ); 
        })}
      </Box>
    </section>
  );
};

export default Product;
