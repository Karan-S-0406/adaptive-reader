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
import { addStudent } from "../store/action/users.action";
import Swal from "sweetalert2";

export default function StudentProfileForm() {
  const dispatch = useDispatch();

  const [studentData, setStudentData] = useState({
    name: "",
    grade: "",
    band: "",
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
      !studentData.band ||
      !studentData.email
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill all required fields.",
      });
      return;
    }

    dispatch(addStudent(studentData));
    console.log("📤 Dispatched:", studentData);
    // Optionally navigate to dashboard or next step
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
          label="Reading Level Band"
          select
          fullWidth
          size="small"
          className="text-field"
          value={studentData.band}
          onChange={handleChange("band")}
        >
          <MenuItem value="A">Band A</MenuItem>
          <MenuItem value="B">Band B</MenuItem>
          <MenuItem value="C">Band C</MenuItem>
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
