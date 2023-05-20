import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from '@mui/material';
import React from 'react'
import useAppSelector from '../hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import { deleteProduct } from '../redux/reducers/productReducers';

const ManageProducts = () => {
const {products} = useAppSelector((state)=> state.productsReducer)
  const [page, setPage] = React.useState(0);
  const dispatch =  useAppDispatch()
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
const navigate = useNavigate()
      const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    
    const handleDelete = (id:number) => {
        dispatch(deleteProduct(id.toString()))
    }
  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
  
          >
            <TableHead >
              <TableRow >
                <TableCell sx={{ backgroundColor: "#1f2c3a", color:"white"}} component="th">ID</TableCell>
                <TableCell sx={{ backgroundColor: "#1f2c3a", color:"white"}} component="th">TITLE</TableCell>
                <TableCell sx={{ backgroundColor: "#1f2c3a", color:"white"}} component="th">PRICE</TableCell>
                <TableCell sx={{ backgroundColor: "#1f2c3a", color:"white"}} component="th">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={product.id}
                    >
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={()=>navigate(`/admin/product/${product.id}`)}>Edit</Button>
                              <Button color="error" variant="contained" onClick={() => handleDelete(product.id)}>
                          Delete
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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default ManageProducts