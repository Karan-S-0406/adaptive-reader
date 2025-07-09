import React from "react";
import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RedeemIcon from "@mui/icons-material/Redeem";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import "./RewardsPage.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function RewardsPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/dashboard/student");
  };

  return (
    <Box className="rewards-container">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={1}
      >
        <Typography variant="h5" className="section-title">
          🏆 Your Rewards
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

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className="reward-card">
            <EmojiEventsIcon className="reward-icon gold" />
            <Typography className="reward-text">Gold Star</Typography>
            <Typography className="reward-subtext">
              Completed 5 reading tasks
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="reward-card">
            <RedeemIcon className="reward-icon green" />
            <Typography className="reward-text">Math Whiz</Typography>
            <Typography className="reward-subtext">
              100 math problems solved
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="reward-card">
            <LocalFireDepartmentIcon className="reward-icon red" />
            <Typography className="reward-text">🔥 7-Day Streak</Typography>
            <Typography className="reward-subtext">
              Daily learning bonus unlocked!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
