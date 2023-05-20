
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './layout/Root'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Product from './pages/Product'
import Profile from './pages/Profile'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {useEffect} from 'react'
import useAppSelector from './hooks/useAppSelector'
import useAppDispatch from './hooks/useAppDispatch'
import { getUser } from './redux/reducers/userReducer'
import Admin from './pages/Admin'
import AdminRoot from './layout/AdminRoot'
import CreateProduct from './pages/CreateProduct'
import { fetchAllCategories, fetchAllProducts } from './redux/reducers/productReducers'
import ManageProducts from './pages/ManageProducts'
import EditProduct from './pages/EditProduct'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/signin",
        element: <Login />,
      },
      {
        path: "/create-account",
        element: <Signup />,
      },

      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Admin />,
      },

      {
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        path: "manage-products",
        element: <ManageProducts />,
      },

      {
        path: "product/:id",
        element: <EditProduct />,
      },
    ],
  },
]);



const App = () => {
  const dispatch =  useAppDispatch()
  const user = useAppSelector((state) => state.userReducers)

  useEffect(() => {
      dispatch(getUser())
  },[user.isLoggedin])


  useEffect(() => {

    dispatch(fetchAllCategories()) 
    dispatch(fetchAllProducts()) 
  }, []);
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer/>
    </div>
  );
}

export default App