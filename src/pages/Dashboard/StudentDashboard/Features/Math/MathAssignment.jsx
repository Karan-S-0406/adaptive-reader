import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import "./MathAssignment.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function MathAssignment() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/dashboard/student");
  };

  return (
    <Box className="math-container">
      <Paper className="math-card">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexWrap="wrap"
          gap={1}
        >
          <Typography variant="h5" className="section-title">
            ➗ Math Assignment
          </Typography>

          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ textTransform: "none", fontWeight: 500, color: "#1B6CA8" }}
          >
            Back to Dashboard
          </Button>
        </Box>

        <Typography className="info-text">
          Level: Addition & Subtraction Level 3
        </Typography>

        <List dense>
          <ListItem>
            <ListItemText primary="Q1: 43 + 28 = ?" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Q2: 100 - 67 = ?" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Q3: 12 + 36 = ?" />
          </ListItem>
        </List>

        <Button variant="outlined" className="hint-btn">
          🧠 Ask Claude for Help
        </Button>

        <Typography className="info-text">
          🔬 Wolfram Verified Answer: 71
        </Typography>

        <Typography className="info-text">
          📈 Performance: 2/3 correct
        </Typography>
        <Typography className="info-text">
          📊 New Level: Stay at Level 3
        </Typography>

        <Typography className="info-text">
          🎉 Earned: <b>+15 XP</b>, <b>Math Whiz Badge</b>
        </Typography>
      </Paper>
    </Box>
  );
}
