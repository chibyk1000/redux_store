import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelector';

const Siderbar = () => {


  return (
    <div className="sidebar">
      <div>
        <Link to="/" className='logo'>
          <img src="/logo192.png" alt="" className="logo" />
        </Link>
      </div>
      <ul>
        <li>
          <NavLink to="/Admin">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/create-product">Create Products</NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-products">Manage Products</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Siderbar