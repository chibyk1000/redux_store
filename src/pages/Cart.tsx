import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import { FaMinus, FaPlus } from "react-icons/fa";
import useAppDispatch from "../hooks/useAppDispatch";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../redux/reducers/cartReducers";

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography , Box} from "@mui/material";
const Cart = () => {
  const cart = useAppSelector((state) => state.cartReducers)
  
  const dispatch = useAppDispatch()
  
    const getTotalPrice = () => {
      return cart.reduce(
        (accumulator, item) =>
          accumulator +
          item.quantity *
             item.price,
        0
      );
    };

    const getTotalAmount = () => {
      return cart.reduce(
        (accumulator, item) => accumulator + item.quantity,
        0
      );
  };
  
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);

const handleChangePage = (event: unknown, newPage: number) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

  return (
    <div className="page">
      {cart.length > 0 ? (
        <>
          <Box sx={{ display: {xs: "block", lg:"flex"}, marginTop: 10 }}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          backgroundColor: "var(--primary-color)",
                          color: "white",
                        }}
                      >
                        Title
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "var(--primary-color)",
                          color: "white",
                        }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "var(--primary-color)",
                          color: "white",
                        }}
                      >
                        Amount
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "var(--primary-color)",
                          color: "white",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={item.id}
                          >
                            <TableCell
                              align="left"
                              sx={{ display: "flex", gap: 3 }}
                            >
                              <img
                                src={item.images[0]}
                                alt={item.title}
                                width={50}
                              />
                              <Typography variant="h5" sx={{fontSize:{xs: 15, md:20}}}>{item.title}</Typography> 
                            </TableCell>
                            <TableCell align="left">
                              <div className="counter">
                                <button
                                  onClick={() =>
                                    dispatch(decrementQuantity(item))
                                  }
                                >
                                  <FaMinus />
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  onClick={() =>
                                    dispatch(incrementQuantity(item))
                                  }
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            </TableCell>
                            <TableCell align="left">
                              $
                              {new Intl.NumberFormat().format(
                                item.price * item.quantity
                              )}
                            </TableCell>
                            <TableCell align="left">
                              <Button
                                sx={{
                                  fontSize: 12,
                                }}
                                onClick={() => dispatch(removeFromCart(item))}
                                color="warning"
                                variant="contained"
                              >
                                Remove Item
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={cart.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <section className="subtotal">
              <div>
                <h3>Total items: {getTotalAmount()} </h3>
              </div>
              <div>
                <h3>
                  Sub Total: ${new Intl.NumberFormat().format(getTotalPrice())}{" "}
                </h3>
              </div>
              <div>
                <h3>
                  Total: ${new Intl.NumberFormat().format(getTotalPrice())}{" "}
                </h3>
              </div>
              <div>
                <Button variant="contained" color="warning">Checkout</Button>
              </div>
            </section>
          </Box>
        </>
      ) : (
        <div className="empty-cart">
          <h2>Empty Cart</h2>
        </div>
      )}

   
    </div>
  );
};

export default Cart;
