import React from 'react'
import { Outlet, Link} from 'react-router-dom'

import Footer from '../components/Footer'
import { AppBar, Box, CssBaseline, Divider,Toolbar, IconButton,   Typography, Button, Drawer, Avatar } from '@mui/material';
import { FaBars, FaShoppingCart } from "react-icons/fa";

import MyMenu from '../components/Menus'
import useAppSelector from '../hooks/useAppSelector';
interface Props {
 
  window?: () => Window;
}

const drawerWidth = 240;

const Root = (props:Props) => {
  const cart = useAppSelector((state) => state.cartReducers);
  const user = useAppSelector((state) => state.userReducers);

const navlinks = [
  { link: "/", text: "Home" },
  { link: "/products", text: "Product" },
  { link: "/favorites", text: "Favorites" },
];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <svg
          className="react-logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-11.5 -10.23174 23 20.46348"
        >
          <title>React Logo</title>
          <circle cx="0" cy="0" r="2.05" fill="var(--primary-color)" />
          <g stroke="var(--primary-color)" stroke-width="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      </Typography>
   
      <Divider />

       {navlinks.map((item) => ( 
          <Button sx={{display:"inline-block", width:"100%"}} key={item.text}>

                  <Link key={item.link} to={item.link} style={{display:'block', textAlign:"left"}} className="side-link">
                    {item.text}
                  </Link>
          </Button>
                ))}
      {user.isLoggedin || user?.user?.email ? (

        <>
          {[
            { link: "/signin", text: "Login" },
            { link: "/create-account", text: "SignUp" },
          ].map((item) => ( 
          <Button sx={{display:"inline-block", width:"100%", color:"var(--primary-color)"}} key={item.text}>

  <Link key={item.link} to={item.link} style={{display:'block', textAlign:"left"}}>
                    {item.text}</Link>
             
          </Button>))}
        
        </>

           

      ) : (
      [
            { link: "/signin", text: "Login" },
            { link: "/create-account", text: "SignUp" },
          ].map((item) => ( 
          <Button sx={{display:"inline-block", width:"100%"}}>

  <Link key={item.link} to={item.link} style={{display:'block', textAlign:"left"}} className="side-link">
                    {item.text}</Link>
            
          </Button>))
      )}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;


   
  return (
    <>
      <Box sx={{}}>
        <CssBaseline /> 
        <AppBar
          component="nav"
          variant="elevation"
          sx={{ backgroundColor: "var(--secondary-color-dark)", display:'flex', justifyContent:"space-between" }}
        >
          <Toolbar sx={{display:'flex', justifyContent:"space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <FaBars color="#fff" />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                width: "1rem",
              }}
            >
              <svg
                className="react-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-11.5 -10.23174 23 20.46348"
              >
                <title>React Logo</title>
                <circle cx="0" cy="0" r="2.05" fill="white" />
                <g stroke="#fff" stroke-width="1" fill="none">
                  <ellipse rx="11" ry="4.2" />
                  <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                  <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
              </svg>
            </Typography>
            <Box 
              sx={{
                display: { xs: "none", md: "flex",  },
                alignItems: "center",
                width: "60%",
                justifyContent: "center", 
              }}
            >
              <Box>
                {navlinks.map((item) => (
                  <Link key={item.link} to={item.link} className="nav-link">
                    {item.text}
                  </Link>
                ))}

                {user?.user?.role === "admin" ? (
                  <Link to="/admin" className="nav-link">
                    Admin
                  </Link>
                ) : (
                  ""
                )}
              </Box>

            </Box>
              <Box
                sx={{
                  display: { sm: "flex" },
                  alignItems: "center",
                  width: {  sm: "30rem", md: "23rem" },
                  justifyContent:{ sx:"space-evenly", md:"space-between"},
                }}
              >
             
              {user.isLoggedin || user?.user?.email ? (
                <Box sx={{ display: { xs: 'none', sm: "flex" } }}>
                
                   <MyMenu
                       color="#fff"
                     title="account"
                     links={[
                       { link: "/profile", text: "Profile" },
                       { link: "#", text: "Logout" },
                     ]}
                   />
               </Box>
              ) : (
                   <Box sx={{ display: { xs: 'none', sm: "flex" } }}>

                     <MyMenu
                       color="#fff"
                       title="Login/Signup"
                       links={[
                         { link: "/signin", text: "Login" },
                         { link: "/create-account", text: "SignUp" },
                       ]}
                     />
                   </Box>
                )}

<Box sx={{display:"flex", gap:2}}>

                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "var(--secondary-color)",
                    color: "white",
                    border: "none",
                    
                    "&:hover": {
                      color: "white",
                      backgroundColor: "var(--secondary-color)",
                      border: "none",
                    },
                  }}
                  >
                  <Link to="/cart" style={{ color: "white" }}>
                    My Cart
                    <FaShoppingCart
                      color="white"
                      style={{ margin: "0 .3em" }}
                      />
                    <Typography
                      component="span"
                      sx={{
                        backgroundColor: "white",
                        color: "var(--primary-color)",
                        padding: "0 .3rem",
                        borderRadius: 1,
                      }}
                      >
                      {cart.length}
                    </Typography>
                  </Link>
                </Button>
                <Avatar src={user?.user?.avatar} alt="logo"  />
                      </Box>
              </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main">
          <Toolbar />

          <Outlet />

          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default Root