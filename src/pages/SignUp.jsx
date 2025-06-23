import React, { useState } from "react";
import { Box, Paper, Typography, Button, Divider, TextField, Link, IconButton, InputAdornment } from "@mui/material";
import googleSvg from "../assets/google.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./SignUp.css";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignUp = () => {
    // Add your Google sign up logic here
    alert("Google sign up not implemented in this demo.");
  };

  const handleTogglePassword = () => setShowPassword((show) => !show);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 400,
          p: 4,
          borderRadius: 4,
          boxShadow: "0 8px 40px 0 rgba(0,0,0,0.10)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={0.5}>
          Create your account
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          to continue to <b>Personalized Reader</b>
        </Typography>

        <Button
          variant="outlined"
          onClick={handleGoogleSignUp}
          startIcon={
            <img
              src={googleSvg}
              alt="Google"
              style={{ width: 22, height: 22, marginRight: 4 }}
            />
          }
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 2,
            py: 1.2,
            mb: 2,
            borderColor: "#e0e0e0",
            color: "#444",
            background: "#fff",
            "&:hover": { background: "#f5f5f5", borderColor: "#bdbdbd" },
          }}
          fullWidth
        >
          Continue with Google
        </Button>

        <Divider sx={{ my: 1.5 }}>or</Divider>

        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight={500}>
              First name
              <span style={{ color: "#aaa", fontWeight: 400, marginLeft: 4 }}>Optional</span>
            </Typography>
            <TextField
              size="small"
              placeholder="First name"
              variant="outlined"
              fullWidth
              sx={{ background: "#fafafa", borderRadius: 1 }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight={500}>
              Last name
              <span style={{ color: "#aaa", fontWeight: 400, marginLeft: 4 }}>Optional</span>
            </Typography>
            <TextField
              size="small"
              placeholder="Last name"
              variant="outlined"
              fullWidth
              sx={{ background: "#fafafa", borderRadius: 1 }}
            />
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={500} mb={0.5}>
          Email address
        </Typography>
        <TextField
          size="small"
          placeholder="Enter your email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, background: "#fafafa", borderRadius: 1 }}
        />

        <Typography variant="body2" fontWeight={500} mb={0.5}>
          Password
        </Typography>
        <TextField
          size="small"
          placeholder="Enter your password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          sx={{ mb: 2, background: "#fafafa", borderRadius: 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end" size="small">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{
            background: "#1B6CA8",
            fontWeight: 700,
            borderRadius: 2,
            py: 1.2,
            mt: 1,
            mb: 1,
            "&:hover": { background: "#a14a2e" },
          }}
          fullWidth
        >
          CONTINUE
        </Button>

        <Typography variant="body2" color="text.secondary" align="center" mt={1}>
          Have an account?{" "}
          <Link href="/login" underline="hover" sx={{ color: "#1B6CA8", fontWeight: 500 }}>
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}