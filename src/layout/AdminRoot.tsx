import {useCallback, useEffect, useState} from "react";
import { Link, Outlet, useNavigate} from "react-router-dom";



import useAppSelector from "../hooks/useAppSelector";
import { toast } from "react-toastify";
import { styled, useTheme, alpha } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Button, InputBase} from "@mui/material";
import {Menu as MenuIcon, ChevronLeft, ChevronRight,  DashboardCustomize, Home} from '@mui/icons-material';
import { FaSearch } from "react-icons/fa";
import { fetchProductsByTitle } from "../redux/reducers/productReducers";
import useDebounce from "../hooks/useDebounce";
import { useDispatch } from "react-redux";



const drawerWidth = 240;


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,

  color: "white",

  backgroundColor: alpha(theme.palette.common.white, 0.5),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  "&:placeholder": {
    color: "white",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto", 
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",

  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),

  
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));


const AdminRoot = () => {
const [searchTitle, setSearchTitle] = useState("");
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

  const dispatch = useDispatch<any>()
    const handleDrawerClose = () => {
      setOpen(false);
    };
  const {user} = useAppSelector((state) => state.userReducers);
  const navigate = useNavigate()
  
   const handleSearchTitle = useCallback(
     (event: React.ChangeEvent<HTMLInputElement>) => {
       setSearchTitle(event.target.value);
     },
     []
  );

    const debouncedtTitleValue = useDebounce(searchTitle, 500);
  
  useEffect(() => {
    dispatch(fetchProductsByTitle(searchTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[debouncedtTitleValue])
  useEffect(() => {
    if (user.role) {

      if (user.role !== 'admin') {
        
        toast.warn('invalid access')
        navigate('/')
      }
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar
          position="fixed"
          open={open}
          sx={{ backgroundColor: "var(--primary-color)" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  mr: 2,
                  ...(open && { display: "none" }),
                  backgroundColor: "var(--primary-color)",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
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
            </Box>
            <Search>
              <SearchIconWrapper>
                <FaSearch />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search product by Title"
                onChange={handleSearchTitle}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Button variant="contained" color="warning">
              <Link to="/admin/create-product" style={{ color: "white" }}>
                Create Product
              </Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,

            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "var(--primary-color)",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeft htmlColor="white" />
              ) : (
                <ChevronRight htmlColor="white" />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ backgroundColor: "white" }} />
          <List>
            {[
              {
                text: "Dashboard",
                link: "/admin",
                icon: <DashboardCustomize htmlColor="white" />,
              },
              { text: "Home", link: "/", icon: <Home htmlColor="white" /> },
            ].map((item, index) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ borderColor: "white" }}
              >
                <ListItemButton>
                  <Link to={item.link} className="dash-links">
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} sx={{ color: "white" }} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Main open={open}>
          <DrawerHeader />

          <Outlet />
        </Main>
      </Box>
    </>
  );
};

export default AdminRoot;
