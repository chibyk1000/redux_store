import  {useState, useEffect} from 'react'
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom'
import useAppSelector from '../hooks/useAppSelector';
const Navbar = () => {
  const [collapse, setCollapse]  = useState(true)
const [total, setTotal] = useState(0);
  const cart = useAppSelector((state) => state.cartReducers)
  const user =  useAppSelector((state)=> state.userReducers)
      useEffect(() => {
        setTotal(
          cart.reduce((accumulator, item) => accumulator + item.quantity, 0)
        );
      }, [cart]);
  
  
  
const navlinks = [
      { link: "/", text: "Home" },
      { link: "/products", text: "Product" },
 
    ];
  return (
    <nav>
      <Link to="/">
        <img src="/logo192.png" alt="" className="logo" />
      </Link>
      <ul  className={`${collapse && 'collapse'}`}>
        {navlinks.map((item) => (
          <li key={item.link}>
            <NavLink
              className={(link) => {
                return link.isActive ? "active" : "";
              }}
              to={item.link}
            >
              {item.text}
            </NavLink>
          </li>
        ))}

        {user.isLoggedin ? (
          <>
            <li>
              <NavLink
                to="/profile"
                className={(link) => {
                  return link.isActive ? "active" : "";
                }}
              >
                Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin"
                className={(link) => {
                  return link.isActive ? "active" : "";
                }}
              >
                Admin
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={(link) => {
                  return link.isActive ? "active" : "";
                }}
              >
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink
              to="/signin"
              className={(link) => {
                return link.isActive ? "active" : "";
              }}
            >
              Login
            </NavLink>
          </li>
        )}
        
      </ul>
        <div>

          <Link to="/cart" className='cart'>
            <FaShoppingCart />
            <span>{total}</span>
      </Link>
      
      <button className='menu' onClick={()=> setCollapse((prev)=> !prev)}>
        <FaBars/>
       </button>
        </div>
    </nav>
  );
}

export default Navbar