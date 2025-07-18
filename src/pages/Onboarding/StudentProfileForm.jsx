import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import "./Onboarding.css";
import { useDispatch } from "react-redux";
// import { addStudent } from "../store/action/users.action";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function StudentProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    name: "",
    grade: "",
    level: "",
    email: "",
    mathLevel: "",
  });

  const handleChange = (field) => (e) => {
    setStudentData({ ...studentData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    // Optional validation
    if (
      !studentData.name ||
      !studentData.grade ||
      !studentData.level ||
      !studentData.email
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill all required fields.",
      });
      return;
    }

    // dispatch(addStudent(studentData));
    console.log("📤 Dispatched:", studentData);
    navigate("/dashboard/teacher");
  };

  return (
    <Box className="centered-container">
      <Paper className="card">
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Student Profile
        </Typography>

        <TextField
          label="Full Name"
          fullWidth
          size="small"
          className="text-field"
          value={studentData.name}
          onChange={handleChange("name")}
        />
        <TextField
          label="Grade"
          fullWidth
          size="small"
          className="text-field"
          value={studentData.grade}
          onChange={handleChange("grade")}
        />
        <TextField
          label="Email"
          fullWidth
          size="small"
          className="text-field"
          value={studentData.email}
          onChange={handleChange("email")}
        />
        <TextField
          label="Reading Level level"
          select
          fullWidth
          size="small"
          className="text-field"
          value={studentData.level}
          onChange={handleChange("level")}
        >
          <MenuItem value="A">level A</MenuItem>
          <MenuItem value="B">level B</MenuItem>
          <MenuItem value="C">level C</MenuItem>
        </TextField>
        <TextField
          label="Math Level (Optional)"
          fullWidth
          size="small"
          className="text-field"
          value={studentData.mathLevel}
          onChange={handleChange("mathLevel")}
        />

        <Button
          variant="contained"
          className="primary-btn"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Save and Continue
        </Button>
      </Paper>
    </Box>
  );
}
