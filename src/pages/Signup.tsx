import axios from 'axios';
import { FormEvent, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { createUser } from '../redux/reducers/userReducer';
import { User } from '../types/User';

const Signup = () => {
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const roleRef = useRef<HTMLSelectElement | null>(null) 
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userReducers)
  const navigate =  useNavigate()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const file = fileRef.current?.files;
      
      if (file) {
        const formdata = new FormData()
        formdata.append('file',file[0])
        const resp = await axios.post("https://api.escuelajs.co/api/v1/files/upload", formdata);
        console.log(resp.data.location);
        if (resp.status === 201) {
          const data: User = { avatar: resp.data.location, name: nameRef.current?.value as string, email: emailRef.current?.value as string, password: passwordRef.current?.value as string, role: roleRef.current?.value as string }
          
          dispatch(createUser(data))

          nameRef.current!.value   = ''
          emailRef.current!.value   = ''
          passwordRef.current!.value   = ''
          fileRef.current!.files = null
          
      setTimeout(() => navigate("/signin"), 4000);
        }
        
      }
    
} catch (error) {
  console.log(error);
  
}  
  
  }


  return (
    <div className="account page">
      <form action="" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <input type="text" name="name" placeholder="name" ref={nameRef} />
        <input type="text" name="email" placeholder="Email Address" ref={emailRef}/> 
        <input type="password" name="password" id="" placeholder="Password"  ref={passwordRef} />
        <div className='form-control'>
          <span>Role: </span>
          <select name="" id="" ref={roleRef}>
            <option value="customer">customer</option>
            <option value="admin">admin</option>
          </select> 
        </div>
        <div className='form-group'>
          <span>Image: </span>
        <input type="file" ref={fileRef} />
        </div>
        <button>Create Account</button>
        <p>
          already have an account?{" "}
          <Link to="/signin">Signin here</Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default Signup