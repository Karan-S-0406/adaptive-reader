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
import smartzy from "../assets/smartzy.png";
import { auth } from "../firebase"; // path may vary
import { onAuthStateChanged, signOut } from "@firebase/auth";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "./Header.css";
import { setIsAuthenticated } from "../pages/store/slice/users.slice";
import { useDispatch, useSelector } from "react-redux";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState("");
  const [menuHover, setMenuHover] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    Features: false,
    Resources: false,
    About: false,
  });
  const isAuthenticated = useSelector(
    (state) => state.storeData.userData?.isAuthenticated
  );

  useEffect(() => {
    // Priority: Firebase Auth user
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          source: "firebase",
        });
      } else {
        // Fallback: Check Redux or localStorage
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        console.log("Stored user from localStorage:", storedUser);

        if (storedUser) {
          setUser({ ...storedUser, source: "custom" });
        } else {
          setUser(null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // const getInitials = (nameOrEmail) => {
  //   if (!nameOrEmail) return "";
  //   const input = nameOrEmail.trim().split(" ");
  //   if (input.length === 1) return input[0][0].toUpperCase();
  //   return (input[0][0] + input[input.length - 1][0]).toUpperCase();
  // };

  const handleLogout = () => {
    const authType = user?.source;

    if (authType === "firebase") {
      signOut(auth);
    }

    setUser(null);
    dispatch(setIsAuthenticated(false));
    localStorage.removeItem("userData");
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
              src={smartzy}
              alt="Smartzy Logo"
              style={{
                width: 60,
                height: 60,
                marginRight: 12,
                padding: 4,
              }}
            />
            <Typography
              variant="h6"
              className="logo-title"
              onClick={() => navigate("/home")}
            >
              Smartzy
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
            {isAuthenticated && (
              <Button
              variant="outlined"
                onClick={() => {
                  handleLogout();
                  handleMenuClose();
                }}
              >
                Logout
              </Button>
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
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {["Features", "Resources", "About"].map((category) => (
              <Box key={category}>
                <ListItem button onClick={() => toggleSection(category)}>
                  <ListItemText primary={category} />
                  {openSections[category] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {openSections[category] &&
                  menuItems[category].map((item) => (
                    <ListItem
                      button
                      key={item.label}
                      onClick={() => {
                        navigate(item.path);
                        handleDrawerToggle(); // ✅ Close only on submenu click
                      }}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
              </Box>
            ))}

            <ListItem
              button
              onClick={() => {
                navigate("/live-demo");
                handleDrawerToggle();
              }}
            >
              <ListItemText primary="Live Demo" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate("/gallery");
                handleDrawerToggle();
              }}
            >
              <ListItemText primary="Gallery" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate("/pricing");
                handleDrawerToggle();
              }}
            >
              <ListItemText primary="Pricing" />
            </ListItem>

            {user ? (
              <ListItem
                button
                onClick={() => {
                  handleLogout();
                  handleDrawerToggle();
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem
                button
                onClick={() => {
                  navigate("/login");
                  handleDrawerToggle();
                }}
              >
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
