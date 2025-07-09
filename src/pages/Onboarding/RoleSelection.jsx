import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <Box className="centered-container">
      <Paper className="card">
        <Typography variant="h4" fontWeight={700} color="#1B6CA8" mb={1}>
          Welcome to Smartzy!
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" mb={3}>
          Let’s get started – select your role below
        </Typography>

        <Button
          variant="outlined"
          className="role-btn"
          onClick={() => navigate("/student-login?role=student")}
        >
          I'm a Student
        </Button>

        <Button
          variant="outlined"
          className="role-btn"
          onClick={() => navigate("/parent-teacher-login?role=parent")}
        >
          I'm a Parent
        </Button>

        <Button
          variant="outlined"
          className="role-btn"
          onClick={() => navigate("/parent-teacher-login?role=teacher")}
        >
          I'm a Teacher
        </Button>
      </Paper>
    </Box>
  );
}
