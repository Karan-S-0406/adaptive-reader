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
import { signOut } from "@firebase/auth";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "./Header.css";
import { setIsAuthenticated } from "../pages/store/slice/users.slice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import { useAuthModal } from "../pages/LoginModal";

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
  const { openModal } = useAuthModal();

  const [openSections, setOpenSections] = useState({
    Features: false,
    Resources: false,
    About: false,
  });
  const isAuthenticated = useSelector(
    (state) => state.storeData.userData.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [isAuthenticated]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getInitials = (nameOrEmail) => {
    if (!nameOrEmail) return "";
    const input = nameOrEmail.trim().split(" ");
    if (input.length === 1) return input[0][0].toUpperCase();
    return (input[0][0] + input[input.length - 1][0]).toUpperCase();
  };

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

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuType("");
    setMenuHover(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={1}
        sx={{
          height: "4.5rem",
          background: "linear-gradient(90deg, #dce3f2, #d5e7e0)",
          px: { xs: 1, md: 5 },
        }}
      >
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
              onClick={() => navigate("/")}
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
            <Button
              className="nav-pill"
              disabled={!user || user?.role !== "student"}
              onClick={() =>
                navigate("/dashboard/student/assignments", {
                  state: { type: "reading" },
                })
              }
              sx={{
                cursor:
                  !user || user?.role !== "student" ? "not-allowed" : "pointer",
              }}
            >
              📖 Reading
            </Button>

            <Button
              className="nav-pill"
              disabled={!user || user?.role !== "student"}
              onClick={() =>
                navigate("/dashboard/student/assignments", {
                  state: { type: "math" },
                })
              }
              sx={{
                cursor:
                  !user || user?.role !== "student" ? "not-allowed" : "pointer",
              }}
            >
              🧮 Math
            </Button>
            <Button className="nav-pill">🏆 Rewards</Button>
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
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button
                  className="login-btn"
                  onClick={() => openModal("student")}
                >
                  <PersonIcon sx={{ fontSize: 18, mr: 1, color: "purple" }} />
                  Student Login
                </Button>
                <Button
                  className="login-btn"
                  onClick={() => openModal("parent")}
                >
                  <PersonIcon sx={{ fontSize: 18, mr: 1, color: "orange" }} />
                  Parent Login
                </Button>
                <Button className="profile-btn">
                  <PersonIcon sx={{ fontSize: 18, mr: 1, color: "skyblue" }} />
                  Profile
                </Button>
              </Box>
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
                {getInitials(user.name || user.email)}
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
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem
              button
              onClick={() => {
                handleDrawerToggle();
              }}
            >
              <ListItemText primary="Reading" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                handleDrawerToggle();
              }}
            >
              <ListItemText primary="Math" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                handleDrawerToggle();
              }}
            >
              <ListItemText primary="Rewards" />
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
              <>
                <ListItem
                  button
                  onClick={() => {
                    openModal("parent");
                    handleDrawerToggle();
                  }}
                >
                  <PersonIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Parent Login" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    openModal("student");
                    handleDrawerToggle();
                  }}
                >
                  <SchoolIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Student Login" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
