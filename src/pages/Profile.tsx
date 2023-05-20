import {useRef, FormEvent, useEffect} from 'react'
import useAppSelector from '../hooks/useAppSelector';

const Profile = () => {
const user =  useAppSelector((state)=>state.userReducers)
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLSelectElement | null>(null); 

  const handleSubmit = (event:FormEvent) => {
    
  }

  console.log(user );
  

  useEffect(() => {
    
   
       
      nameRef.current!.value =user.user.name as string
      emailRef.current!.value =user.user.email as string
      roleRef.current!.value =user.user.role as string
      nameRef.current!.value =user.user.name as string
      
  
    
},[])
  return (
    <div className="account page">
      <form action="" onSubmit={handleSubmit}>
        <h1>Profile</h1>
        <input type="text" name="name" placeholder="name" ref={nameRef} />
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Password"
          ref={passwordRef}
        />
        <div className="form-control">
          <span>Role: </span>
          <select name="" id="" ref={roleRef}>
            <option value="customer">customer</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div className="form-group">
          <span>Image: </span>
          <input type="file" ref={fileRef} />
        </div>
        <button>Update</button>
     
      </form>
    </div>
  );
}

export default Profile