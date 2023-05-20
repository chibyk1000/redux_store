import {useState, ChangeEvent, FormEvent, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import { userAuth } from '../redux/reducers/userReducer';

import useAppSelector from '../hooks/useAppSelector';
const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const user =  useAppSelector((state)=> state.userReducers)
  const [data, setData] = useState({ email: "", password: "" })
  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event?.target.name]:event?.target.value
    })
  }
  const handleSubmit = (event: FormEvent) => {
    try {
      event.preventDefault()
      dispatch(userAuth(data))
      console.log(user.isLoggedin);
      
    
    } catch (error) {
      
    }
  };

  useEffect(() => {
    if (user.isLoggedin) {
      navigate("/products");
    }
}, [user.isLoggedin])
  
  return (
    <div className="account page">
      <form action="" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          placeholder="Email Adress"
          onChange={handleChange}
          value={data.email}
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Password"
          onChange={handleChange}
          value={data.password}
        />

        <button>Login</button>

        <p>
          Don't have an account?{" "}
          <Link to="/create-account">create account</Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default Login