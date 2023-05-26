import { Facebook, GitHub, LinkedIn, Twitter } from '@mui/icons-material';
import {  Paper } from '@mui/material';

import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <Paper>
      
 
      <footer  className="footer-distributed">
        <div className="footer-right">
          <Link to="#">
     <Facebook/>
          </Link>
          <Link to="#">
       <Twitter/>
          </Link>
          <Link to="#">
      <LinkedIn/>
          </Link>
          <Link to="#">
       <GitHub/> 
          </Link>
        </div>

        <div className="footer-left">
         
          

            <Link to="/">Home</Link>

            <Link to="/product">Pricing</Link>

            <Link to="/create-account">Create Account</Link>

            <Link to="/sign">Login</Link>

            <Link to="#">Contact</Link>
         
         {/* <span>Company Name &copy; 2015</span> */}
        </div>
      </footer>
    </Paper>
  );
}

export default Footer