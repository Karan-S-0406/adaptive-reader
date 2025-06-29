import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import logo from "../assets/blogger.png";
import { auth } from "../firebase"; // path may vary
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { Avatar } from "@mui/material";

const menuItems = {
  Features: [
    { label: "Translations", path: "/features/translations" },
    { label: "Reading Levels", path: "/features/reading-levels" },
    { label: "AudioBooks", path: "/features/audio-books" },
  ],
  Resources: [
    { label: "Library", path: "/resources/library" },
    { label: "Free Downloads", path: "/resources/free-downloads" },
    { label: "Request Content", path: "/resources/request-content" },
  ],
  About: [
    { label: "Story", path: "/about/story" },
    { label: "Mission", path: "/about/mission" },
  ],
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState("");
  const [menuHover, setMenuHover] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
    navigate("/");
  };

  const handleMenuOpen = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuType("");
    setMenuHover(false);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!menuHover) {
        handleMenuClose();
      }
    }, 100);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="fixed" color="inherit" elevation={1}>
        <Toolbar sx={{ px: { xs: 1, md: 5 } }}>
          {/* Mobile Menu Icon */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              mr: 2,
            }}
          >
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo & Title */}
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

          {/* Desktop Navigation */}
          <Box
            sx={{
              flex: 2,
              display: { xs: "none", md: "flex" },
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
            <Typography sx={{ color: "#bbb", mx: 1 }}>|</Typography>
            <Button
              color="inherit"
              sx={{ color: "#20303C", textTransform: "none" }}
              onClick={() => navigate("/gallery")}
            >
              Gallery
            </Button>
            <Button
              color="inherit"
              sx={{ color: "#20303C", textTransform: "none" }}
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </Button>
          </Box>

          {/* Right: Auth / Avatar */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {user ? (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuType === "avatar"}
                onClose={handleMenuClose}
                MenuListProps={{ sx: { minWidth: 140 } }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleMenuClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            ) : (
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#20303C",
                  color: "#20303C",
                  textTransform: "none",
                  fontWeight: 500,
                  ml: 1,
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
            {user && (
              <Avatar
                sx={{
                  bgcolor: "#20303C",
                  color: "#fff",
                  width: 36,
                  height: 36,
                  fontSize: 14,
                  ml: 2,
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                  setMenuType("avatar");
                }}
              >
                {getInitials(user.displayName)}
              </Avatar>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            {["Features", "Resources", "About"].map((category) => (
              <Box key={category}>
                <ListItem>
                  <ListItemText primary={category} />
                </ListItem>
                {menuItems[category].map((item) => (
                  <ListItem
                    button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                  >
                    <ListItemText primary={item.label} sx={{ pl: 2 }} />
                  </ListItem>
                ))}
              </Box>
            ))}
            <ListItem button onClick={() => navigate("/live-demo")}>
              <ListItemText primary="Live Demo" />
            </ListItem>
            <ListItem button onClick={() => navigate("/gallery")}>
              <ListItemText primary="Gallery" />
            </ListItem>
            <ListItem button onClick={() => navigate("/pricing")}>
              <ListItemText primary="Pricing" />
            </ListItem>
            {user ? (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem button onClick={() => navigate("/login")}>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
