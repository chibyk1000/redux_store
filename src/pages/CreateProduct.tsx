import {ChangeEvent, FormEvent, useState} from 'react'
import useAppSelector from '../hooks/useAppSelector'
import axios from 'axios'
import { toast } from 'react-toastify'
import useAppDispatch from '../hooks/useAppDispatch'
import { createNewProduct, fetchAllProducts } from '../redux/reducers/productReducers'
import { Product } from '../types/Products'

const CreateProduct = () => {
const [files, setFiles] = useState<string[]>([])
  const { categories } = useAppSelector((state) => state.productsReducer)

  const [data, setData] = useState({ title: "", price: "", description: "", categoryId: "" })
  const dispatch=  useAppDispatch()
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>
  ) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeFile = async(event:ChangeEvent<HTMLInputElement >) => {
    try {
    
      
      const file = event.target.files
      console.log(file);
      
      const formdata = new FormData()
      if (file) {
        
        formdata.append("file", file[0]);
              const resp = await axios.post(
                "https://api.escuelajs.co/api/v1/files/upload",
                formdata
              );
        if (resp.status === 201) {
          toast.success('image uploaded successfully')
             setFiles([...files, resp.data.location])
           }
      }
    } catch (error) {
      console.log(error);
      
    }
  }


  const handleSubmit = (event:FormEvent) => { 
    event.preventDefault()
    if (!data.categoryId || !data.description || !data.price || !data.title) {
      toast.error('missing fields') 
      return
    }
    try {
      const sentData:any = { ...data, images: files }
      dispatch(createNewProduct(sentData))
      dispatch(fetchAllProducts())
    } catch (error) {
      
    }
  }
  return (
    <div className=''>
      <form action="" onSubmit={handleSubmit}>
        <h1>Create Product</h1>
        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={data.title}
        />
        <input
          type="text"
          placeholder="Price"
          name="price"
          onChange={handleChange}
          value={data.price}
        />
        <textarea name="description" id="" cols={30} rows={10}  value={data.description} onChange={handleChange}  placeholder='Description'></textarea>
        <select name="categoryId" id="" value={data.categoryId} onChange={handleChange}>
          <option value="">choose category</option>
          {categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>
        <input type="file" onChange={handleChangeFile} />

        <button>Create Product</button>
      </form>
    </div>
  );
}

export default CreateProduct