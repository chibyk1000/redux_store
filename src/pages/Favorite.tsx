import React from 'react'
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';

import { removeItem } from '../redux/reducers/favoriteReducers';
import { addToCart } from '../redux/reducers/cartReducers';
const Favorite = () => {

     const favorite = useAppSelector((state) => state.favoriteReducers);

     const dispatch = useAppDispatch();
 
   

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
    <div>
      {favorite.length > 0 ? ( 
        <>
          <Box sx={{ display: { xs: "block", lg: "flex", marginTop:10 } }}>
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
                        Price
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
                    {favorite
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
                              <Typography
                                variant="h5"
                                sx={{ fontSize: { xs: 15, md: 20 } }}
                              >
                                {item.title}
                              </Typography>
                            </TableCell>

                            <TableCell align="left">${item.price}</TableCell>
                            <TableCell align="left">
                              <Button
                                sx={{
                                  fontSize: 12,
                                }}
                                variant="contained"
                                color="error"
                                onClick={() => dispatch(removeItem(item))}
                              >
                                Remove Item
                              </Button>
                              <Button
                                sx={{
                                  fontSize: 12,
                                }}
                                variant="contained"
                                color="warning"
                                onClick={() => dispatch(addToCart(item))}
                              >
                                Add Item
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
                count={favorite.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
    
          </Box>
        </>
      ) : (
        <div className="empty-cart">
                      <h2>No Favorite Item</h2>
                      
        </div>
      )}
    </div>
  );
}

export default Favorite