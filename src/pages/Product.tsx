import React, { useEffect, useState, useCallback } from "react";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";

import { HiShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { addToCart } from "../redux/reducers/cartReducers";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Button,
  InputBase,
  AppBar,
  Toolbar,
  Skeleton,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,

  ListItemText,
  ListItemButton,
  Paper,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  fetchAllProducts,
  sortProductsByCategory,
  sortProductsByPrice,

  fetchProductByCategory,
  fetchProductByJointFilter,

} from "../redux/reducers/productReducers";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { saveItem } from "../redux/reducers/favoriteReducers";
import { styled, alpha } from "@mui/material/styles";
import { Product as ProductType } from "../types/Products";
import { ExpandMore } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,

  color: "white",

  backgroundColor: alpha(theme.palette.common.white, 0.5),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  "&:placeholder": {
    color: "white",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",

  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "10ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

const Product = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [minPriceSearch, setMinPriceSearch] = useState("");
  const [maxPriceSearch, setMaxPriceSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { products } = useAppSelector((state) => state.productsReducer);
  const savedItems = useAppSelector((state) => state.favoriteReducers);
  const categories = useAppSelector((state) => state.categoryReducers);
 
  const [visibleItemCount, setVisibleItemCount] = useState(20);
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState("all");
  const handleChangeFilter = (event: any) => {
    setFilter(event.target.value as string);
  };

  
  const handleSearchTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTitle(event.target.value);
    },
    []
    );
    const debouncedMinValue = useDebounce(minPriceSearch, 600);
    const debouncedMaxValue = useDebounce(maxPriceSearch, 600);
    const debouncedtTitleValue = useDebounce(searchTitle, 500);

  const handleChangeInputMin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMinPriceSearch(event.target.value);
    },
    []
  );


  const handleChangeInputMax = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMaxPriceSearch(event.target.value);
    },
    []
  );

  useEffect(() => {
    dispatch(
      fetchProductByJointFilter({
        categoryId,
        price_min: debouncedMinValue,
        price_max: debouncedMaxValue,
        title: debouncedtTitleValue,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMinValue, debouncedMaxValue, debouncedtTitleValue]);


  const checkedSaved = (item: ProductType) => {
    const foundItem = savedItems.find((product) => product.id === item.id);
    if (foundItem) {
      return true;
    }
    return false;
  };



  const loadMoreItems = () => {
    const newVisibleItemCount = visibleItemCount + 20;

    setVisibleItemCount(newVisibleItemCount);
  };

  useEffect(() => {
    if (filter === "categories") {
      dispatch(sortProductsByCategory());
    } else if (filter === "price") {
      dispatch(sortProductsByPrice());
    } else {
      dispatch(fetchAllProducts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [filter]);
  const hasMoreItems = products.length > visibleItemCount;

 

  return (
    <section style={{ width: "100%" }}>
      <div className="filter">
        <Box sx={{ width: "100%" }}>
          <AppBar
            position="static"
            sx={{
              backgroundColor: "var(--primary-color)",

              padding: ".5em 0",
            }}
          >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormControl sx={{ width: 100 }}>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: "white" }}
                >
                  Sort{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter}
                  label="sort"
                  onChange={handleChangeFilter}
                  sx={{
                    color: "white",
                    "&.MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="categories">Categories</MenuItem>
                  <MenuItem value="price">Price</MenuItem>
                </Select>
              </FormControl>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  onChange={handleSearchTitle}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={5} md={2}>
          <Paper>
            <Typography variant="h5" sx={{ padding: "1em" }}>
              Filter
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Categories</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {categories.map((category) => {
                    return (
                      <ListItem disablePadding key={category.id}>
                        <ListItemButton
                          onClick={() => {
                            dispatch(
                              fetchProductByCategory(category.id.toString())
                            );
                            setCategoryId(category.id.toString());
                          }}
                        >
                          <ListItemText primary={category.name} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Price Range</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <TextField
                  id="outlined-basic"
                  label="min"
                  variant="outlined"
                  type="number"
                  onChange={handleChangeInputMin}
                />{" "}
                <Typography> - </Typography>
                <TextField
                  id="outlined-basic"
                  label="max"
                  variant="outlined"
                  type="number"
                  onChange={handleChangeInputMax}
                />
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
        <Grid item xs={7} md={10}>
          {products.length > 1 ? (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(calc(250px - 1rem), 1fr))",
                  gap: "1rem",
                }}
              >
                {products.slice(0, visibleItemCount).map((product) => {
                  return (
                    <Card sx={{ position: "relative" }} key={product.id}>
                      <Link to={`/product/${product.id}`}>
                        <CardMedia
                          component="img"
                          height="194"
                          image={product.images[0]}
                          alt={product.title}
                          loading="lazy"
                        />
                        <CardContent sx={{ height: "8rem" }}>
                          <Typography sx={{ color: "#2D9E6D" }}>
                            {product.category.name}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="var(--secondary-color)"
                          >
                            ${new Intl.NumberFormat().format(product.price)}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ fontWeight: 700 }}
                          >
                            {product.title.length > 40
                              ? product.title.substring(0, 40) + "..."
                              : product.title}
                          </Typography>
                        </CardContent>
                      </Link>
                      <IconButton
                        aria-label="add to favorites"
                        sx={{ position: "absolute", top: 0 }}
                        onClick={() => {
                          dispatch(saveItem(product));
                        }}
                      >
                        <FavoriteIcon
                          sx={{
                            color: `${
                              checkedSaved(product)
                                ? "var(--secondary-color)"
                                : ""
                            }`,
                          }}
                        />
                      </IconButton>
                      <CardActions disableSpacing>
                        <Button
                          endIcon={<HiShoppingCart />}
                          sx={{
                            color: "var(--primary-color)",
                            border: "solid var(--primary-color) 1px",
                            backgroundColor: "#fff",
                            width: "100%",
                            fontSize: 17,
                            "&:hover": {
                              color: "white",
                              backgroundColor: "var(--secondary-color)",
                            },
                          }}
                          onClick={() => dispatch(addToCart(product))}
                        >
                          Add To Cart
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })}
              </Box>

              {hasMoreItems && (
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "var(--secondary-color)",
                    display: "block",
                    margin: "1em auto",
                    width: "10rem",

                    fontSize: 17,
                    "&:hover": {
                      color: "var(--secondary-color)",
                      backgroundColor: "white",
                      border: "solid var(--secondary-color) 1px",
                    },
                  }}
                  onClick={loadMoreItems}
                >
                  LOAD MORE
                </Button>
              )}
            </>
          ) : (
            <>
              <Grid container spacing={2}>
                {Array.from(new Array(8)).map((index) => {
                  return (
                    <Grid item xs={3} key={index}>
                      <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={118}
                        />
                        <Box sx={{ pt: 0.5 }}>
                          <Skeleton />
                          <Skeleton width="60%" />
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </section>
  );
};

export default Product;
