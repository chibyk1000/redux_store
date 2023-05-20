import {useEffect} from "react";
import { Outlet, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Siderbar from "../components/Siderbar";
import Dashboard from "../components/Dashboard";
import useAppSelector from "../hooks/useAppSelector";
import { toast } from "react-toastify";
const AdminRoot = () => {
  const {user} = useAppSelector((state) => state.userReducers);
const navigate =  useNavigate()
  useEffect(() => {
    console.log(user);
    
    if (user.role !== 'admin') {
      toast('invalid access')
      navigate('/')
    }
  },[])
  return (
    <>
      <div className="container">
        <Siderbar />
        <div className="dashboard">
     
        <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminRoot;
