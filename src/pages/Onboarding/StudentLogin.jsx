import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserIdAndRole } from "../store/action/users.action";
import Swal from "sweetalert2";
import { setIsAuthenticated, setNameAndRole } from "../store/slice/users.slice";

export default function StudentLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      dispatch(setNameAndRole(user));
      // ✅ Save auth state
      dispatch(setIsAuthenticated(true));
      navigate(`/dashboard/${user.role}`);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong");
    }
  };

  return (
    <Box className="centered-container">
      <Paper className="card">
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Student Login
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Choose how you'd like to sign in
        </Typography>

        <TextField
          label="Class Code or School Email"
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
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          className="primary-btn"
          sx={{ mt: 1 }}
          onClick={handleLogin}
          disabled={!email.trim()} // disables if email is empty or just spaces
        >
          Continue
        </Button>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          For any issues, contact your teacher or school admin.
        </Typography>

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
