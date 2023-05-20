import {useState, ChangeEvent, FormEvent, useEffect} from 'react'
import useAppSelector from '../hooks/useAppSelector';
import { useParams } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import { updateProduct } from '../redux/reducers/productReducers';
const EditProduct = () => {

    const { categories,  products } = useAppSelector((state) => state.productsReducer);
      const [data, setData] = useState({
        title: "",
        price: "",
        description: "",
        categoryId: "",
      });
      const handleChange = (
        event: ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        setData({
          ...data,
          [event.target.name]: event.target.value,
        });
    };
    
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
   
          
      }, []);
    

    
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const updateData = {...data, id}
        dispatch(updateProduct(updateData))
    }
  return (
      <div className=''>
          
        
      <form action="" onSubmit={handleSubmit}>
        <h1>Edit Product</h1>
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
        <textarea
          name="description"
          id=""
          cols={30}
          rows={10}
          value={data.description}
          onChange={handleChange}
          placeholder="Description"
        ></textarea>
        <select
          name="categoryId"
          id=""
          value={data.categoryId}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>
        {/* <input type="file" onChange={handleChangeFile} /> */}

        <button>Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct