import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";


interface Props {
  title: string;
  links: { link: string; text: string }[]
  color:string
}
export default function BasicMenu({title, links, color}:Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('tokens')
    window.location.href ='/'
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick} 
        variant="outlined"
        sx={{
          color: color, border: "none", fontSize: '13px', "&:hover": {
            border: "none",
            backgroundColor:"var(--secondary-color)"
            
        }}}
      >
        {title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{width:"100rem"}}
      >
        {links.map((item) => {
          if (item.text === "Logout") { 
            return (
              <MenuItem
                onClick={handleLogout}
                key={item.text}
                className="drop-link"
              >
                {item.text}
              </MenuItem>
            );
          }
          return (
            <MenuItem sx={{width:"100%"}} key={item.text}>
              <Link to={item.link} className="drop-link">{item.text}</Link>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
