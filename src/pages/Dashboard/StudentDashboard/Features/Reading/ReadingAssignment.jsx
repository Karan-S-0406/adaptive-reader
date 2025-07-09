import React from "react";
import { Box, Paper, Typography, Button, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./ReadingAssignment.css";

export default function ReadingAssignment() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard/student");
  };

  return (
    <Box className="reading-container">
      <Paper className="reading-card">
        {/* Title and Back Button */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={1}>
          <Typography variant="h5" className="section-title">
            📚 Reading Assignment
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

        <Typography variant="subtitle2" className="info-text">
          Level G Story: <b>“The Owl Who Couldn’t Sleep”</b>
        </Typography>

        <Typography className="paragraph">
          Once upon a time in a quiet forest, there was a little owl named Ollie who had trouble sleeping...
        </Typography>

        <Box className="reading-options">
          <Button variant="outlined">🔊 Listen with TTS</Button>
          <Button variant="outlined">🎙️ Read Aloud</Button>
        </Box>

        <Divider className="divider" />

        <Typography className="info-text">🧠 Comprehension Quiz Available</Typography>
        <Button variant="contained" className="quiz-btn">Take Quiz</Button>

        <Divider className="divider" />

        <Typography className="info-text">
          ✅ Performance Summary:
        </Typography>
        <ul className="summary-list">
          <li>Fluency Score: <b>87%</b></li>
          <li>Suggested Level: <b>Stay</b> at Level G</li>
        </ul>

        <Typography className="info-text">
          🎉 Earned: <b>+20 XP</b>, <b>Gold Star</b>
        </Typography>
      </Paper>
    </Box>
  );
}
