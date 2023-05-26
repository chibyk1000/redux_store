import {useState,  FormEvent, useEffect} from 'react'
import useAppSelector from '../hooks/useAppSelector';
import { useParams } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import { updateProduct } from '../redux/reducers/productReducers';
import { TextField, Grid, InputLabel, Select, MenuItem , FormControl, SelectChangeEvent, Button} from '@mui/material';

const EditProduct = () => {

    const categories = useAppSelector((state) => state.categoryReducers);
    const {products} = useAppSelector((state) => state.productsReducer);
      const [data, setData] = useState({
        title: "",
        price: "",
        description: "",
        categoryId: "",
      });
  
    
    const { id } = useParams()
    
      const dispatch = useAppDispatch();

    const product = products.find(p => p.id === Number(id));
      useEffect(() => {
        if (product) {
          setData({
            ...data,
            title: product?.title as string,
            price: product?.price.toString() as string,
            description: product?.description as string,
            categoryId: product?.category.id.toString() as string,
          });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    

    
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const updateData = {...data, id}
        dispatch(updateProduct(updateData))
    }
  return (
    <div className="">
      <form action="" onSubmit={handleSubmit}>
        <h1>Edit Product</h1>
      
         <Grid container spacing={2}>
          <Grid item xs={12}>


        <TextField
          autoComplete="given-name"
          name="title"
          required
          fullWidth
          id="Title"
          value={data.title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setData({...data, title:event.target.value})
          }
          label="Title"
          autoFocus
        />
          </Grid>

           <Grid item xs={12}>
<TextField
          autoComplete="given-name"
          name="price"
          type="number"
          required
          fullWidth
          id="Price"
          value={data.price}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setData({...data, price:event.target.value})
          }
          label="Price"
          autoFocus
        />
      

           </Grid>

              <Grid item xs={12}>
<TextField
          autoComplete="given-name"
          name="description"
          required
          fullWidth
          multiline
          id="description"
          value={data.description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setData({...data, description:event.target.value})
          }
          label="Description"
          autoFocus
        />

              </Grid>

              <Grid item xs={12}>
<FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">Category </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    fullWidth
                    label="Category"
                    placeholder="Category"
                    onChange={(event: SelectChangeEvent) =>
                      setData({...data, categoryId:event.target.value})
                    }
                    value={data.categoryId}
                  >
                       {categories.map((category) => (
                         <MenuItem value={category.id}>{category.name}</MenuItem>
         
          ))}
               
                  </Select>
                </FormControl>
                </Grid>
          </Grid>
        <Button variant="contained" sx={{margin:"1rem 0 "}}     fullWidth type="submit">Update Product</Button>
        
       
    

      </form>
    </div>
  );
}

export default EditProduct