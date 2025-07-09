import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import googleSvg from "../../assets/google.svg";
import "./Onboarding.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserIdAndRole } from "../store/action/users.action";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setIsAuthenticated, setNameAndRole } from "../store/slice/users.slice";

export default function ParentTeacherLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    try {
      const response = await dispatch(getUserIdAndRole(email));
      const user = response.payload;

      if (!user.success) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: user.message || "Invalid email",
        });
        return;
      }

      // Check role mismatch with URL param
      const roleFromUrl = new URLSearchParams(location.search).get("role");
      if (user.role !== roleFromUrl) {
        Swal.fire({
          icon: "warning",
          title: "Wrong Role",
          text: `Please login as ${user.role} instead.`,
        });
        return;
      }
      localStorage.setItem("userData", JSON.stringify(user));
      dispatch(setNameAndRole(user));
      dispatch(setIsAuthenticated(true));
      navigate(`/dashboard/${user.role}`);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in as:", user.displayName);
      dispatch(setIsAuthenticated(true));
      navigate("/dashboard/teacher");
    } catch (error) {
      console.error("Sign-in error", error);
      alert("Google sign-in failed. Please try again.");
    }
  };

  return (
    <Box className="centered-container">
      <Paper className="card">
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Sign in as Parent or Teacher
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          size="small"
          className="text-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          size="small"
          className="text-field"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          className="primary-btn"
          onClick={handleLogin}
          disabled={!email.trim()} // disables if email is empty or just spaces
        >
          Continue
        </Button>

        <Divider sx={{ my: 2 }}>or</Divider>

        <Button
          variant="outlined"
          className="google-btn"
          startIcon={<img src={googleSvg} alt="Google" width="20" />}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
        <Divider sx={{ my: 2 }}>or</Divider>
        {/* 👇 Back Button */}
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{
            mt: 3,
            textTransform: "none",
            color: "#1B6CA8",
            fontWeight: 500,
          }}
        >
          Back to Role Selection
        </Button>
      </Paper>
    </Box>
  );
}
