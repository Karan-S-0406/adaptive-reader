import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import logo from "../assets/blogger.png"; // Add this import

const menuItems = {
  Features: [
    { label: "Translations", path: "/features/translations" },
    { label: "Reading Levels", path: "/features/reading-levels" },
    { label: "AudioBooks", path: "/features/audio-books" },
    // { label: "Print On Demand", path: "/features/print-on-demand" },
  ],
  Resources: [
    { label: "Library", path: "/resources/library" },
    { label: "Free Downloads", path: "/resources/free-downloads" },
    { label: "Request Content", path: "/resources/request-content" },
  ],
  About: [
    { label: "Story", path: "/about/story" },
    { label: "Mission", path: "/about/mission" },
    // { label: "Careers", path: "/about/careers" },
  ],
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState("");
  const navigate = useNavigate();

  // Track if mouse is over menu or button
  const [menuHover, setMenuHover] = useState(false);

  const handleMenuOpen = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuType("");
    setMenuHover(false);
  };

  // Only close if not hovering over menu or button
  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!menuHover) {
        handleMenuClose();
      }
    }, 100);
  };

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar sx={{ px: { xs: 1, md: 5 } }}>
        {/* Left: Logo and Heading */}
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Personalized Reader Logo"
            style={{
              width: 38,
              height: 38,
              marginRight: 12,
              borderRadius: 8,
              background: "#000",
              padding: 4,
              objectFit: "contain",
            }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#000", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Personalized Reader
          </Typography>
        </Box>

        {/* Center: Navigation */}
        <Box
          sx={{
            flex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          {["Features", "Resources", "About"].map((label) => (
            <Box
              key={label}
              onMouseEnter={(e) => handleMenuOpen(e, label)}
              onMouseLeave={handleMouseLeave}
              sx={{ display: "inline-block" }}
            >
              <Button
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                sx={{
                  color: "#20303C",
                  fontWeight: 500,
                  textTransform: "none",
                }}
              >
                {label}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuType === label}
                onClose={handleMenuClose}
                MenuListProps={{
                  onMouseEnter: () => setMenuHover(true),
                  onMouseLeave: () => {
                    setMenuHover(false);
                    handleMenuClose();
                  },
                  sx: { minWidth: 180 },
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                disableAutoFocusItem
              >
                {menuItems[label].map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      navigate(item.path);
                      handleMenuClose();
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ))}
          <Button
            color="inherit"
            sx={{ color: "#20303C", textTransform: "none" }}
            onClick={() => navigate("/live-demo")}
          >
            Live Demo
          </Button>
          <Button
            color="inherit"
            sx={{ color: "#20303C", textTransform: "none" }}
            onClick={() => navigate("/pricing")}
          >
            Pricing
          </Button>
          <Typography sx={{ color: "#bbb", mx: 1 }}>|</Typography>
          <Button
            color="inherit"
            sx={{ color: "#20303C", textTransform: "none" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>

        {/* Right: Sign Up */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#20303C",
              color: "#20303C",
              textTransform: "none",
              fontWeight: 500,
              ml: 1,
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up Free
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
