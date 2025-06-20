// src/components/Header.jsx
import React, { useState } from "react";
import { IconButton, Typography, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState("");

  const handleOpen = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuType("");
  };

  const menuItems = {
    Features: ["Translations", "AudioBooks", "Print On Demand"],
    Resources: ["Video Tutorials", "Teacher Guide", "Free Downloads"],
    About: ["Story", "Mission", "Careers"],
  };

  return (
    <div className="hidden md:flex flex-row gap-6 items-center text-[#20303C]">
      <Typography variant="h6" className="text-[#20303C] font-semibold">
        Adaptive Reader
      </Typography>
      {["Features", "Resources", "About"].map((label) => (
        <div key={label}>
          <Button color="inherit" onClick={(e) => handleOpen(e, label)}>
            {label}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && menuType === label}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
          >
            {menuItems[label].map((item) => (
              <MenuItem key={item} onClick={handleClose}>
                {item}
              </MenuItem>
            ))}
          </Menu>
        </div>
      ))}
      <Button color="inherit">Library</Button>
      <Button color="inherit">Pricing</Button>
      <span className="mx-2 text-gray-300">|</span>
      <Button color="inherit">Login</Button>
      <Button variant="outlined" className="border-[#20303C] text-[#20303C]">
        Sign Up Free
      </Button>
    </div>
  );
};

export default Header;
