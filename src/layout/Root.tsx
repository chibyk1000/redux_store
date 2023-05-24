import React from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AppBar, Box, CssBaseline, Divider,Toolbar, IconButton, List, ListItem, ListItemButton, ListItemText, Typography, Button, Drawer, Badge, Avatar } from '@mui/material';
import { FaBars, FaShoppingCart } from "react-icons/fa";
import MyMenu from '../components/Menus'
interface Props {
 
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];
const Root = (props:Props) => {

const navlinks = [
  { link: "/", text: "Home" },
  { link: "/products", text: "Product" },
];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider /> 
      <List>
        {navlinks.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink to={item.link}>
                {item.text}
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  
  return (
    <>
      <Box sx={{ display: "flex" , justifyContent:"center"}}>
        <CssBaseline />
        <AppBar
          component="nav"
          variant="elevation"
          sx={{ backgroundColor: "white" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <FaBars color="#1f2c3a" />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <img src="/logo192.png" alt="logo" width={80} />
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                width: "60%",
                justifyContent: "space-between",
              }}
            >
              <Box>
                {navlinks.map((item) => (
                  <NavLink key={item.link} to={item.link}>
                    {item.text}
                  </NavLink>
                ))}

                <NavLink
                  to="/admin"
                  className={(link) => {
                    return link.isActive ? "active" : "";
                  }}
                >
                  Admin
                </NavLink>
              </Box>

              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  width: { xs: "none", sm: "40rem", md: "20rem", lg: "17rem" },
                  justifyContent: "space-between",
                }}
              >
                <MyMenu
                  title="account"
                  links={[
                    { link: "/profile", text: "Profile" },
                    { link: "#", text: "Logout" },
                  ]}
                />

                <MyMenu
                  title="Login"
                  links={[
                    { link: "/signin", text: "Login" },
                    { link: "/create-account", text: "SignUp" },
                  ]}
                />
                <Badge badgeContent={4} color="secondary">
                  <FaShoppingCart color="#1f2c3a" />
                </Badge>
                <Avatar src="/images/pics.jpg" alt="logo" />
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
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <div className="container">
            <Outlet />
          </div>
      <Footer />
        </Box>
      </Box>
    </>
  );
}

export default Root