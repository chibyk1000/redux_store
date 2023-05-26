import {  FormEvent, useState } from "react";
import useAppSelector from "../hooks/useAppSelector";

import { toast } from "react-toastify";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  createNewProduct,
  fetchAllProducts,
} from "../redux/reducers/productReducers";

import {
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Button,
  Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { uploadMultipleFiles } from "../utils/fetch";
const CreateProduct = () => {
  const [files, setFiles] = useState<File[] | []>([]);
  const categories = useAppSelector((state) => state.categoryReducers);

  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
  });


  const dispatch = useAppDispatch();


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!data.categoryId || !data.description || !data.price || !data.title) {
      toast.error("missing fields");
      return;
    }
    try {
      if (files.length > 0) {
        const imagelinks = await uploadMultipleFiles(
          files,
          "https://api.escuelajs.co/api/v1/files/upload"
        ) as string[]

        if (imagelinks?.length > 1) {
                const sentData:any = { ...data, images: imagelinks }
          dispatch(createNewProduct(sentData))
          dispatch(fetchAllProducts())
        }

      
       
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <form action="" onSubmit={handleSubmit}>
        <h1>Create Product</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              placeholder="Title"
              name="title"
              fullWidth
              value={data.title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setData({ ...data, title: event.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="text"
              placeholder="Price"
              name="price"
              fullWidth
              value={data.price}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setData({ ...data, price: event.target.value })
              }
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
                setData({ ...data, description: event.target.value })
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
                  setData({ ...data, categoryId: event.target.value })
                }
                value={data.categoryId}
              >
                {categories.map((category) => (
                  <MenuItem value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl sx={{ width: "100%" }}>
              <Typography component="label">Upload product photos</Typography>
              <MuiFileInput
                value={files}
                multiple
                onChange={(file) => setFiles(file)}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Button variant="contained" sx={{ margin: "1rem 0 " }} fullWidth type="submit">
          Create Product
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
