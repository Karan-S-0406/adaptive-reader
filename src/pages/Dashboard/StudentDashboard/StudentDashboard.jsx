import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalculateIcon from "@mui/icons-material/Calculate";
import SettingsIcon from "@mui/icons-material/Settings";
import RedeemIcon from "@mui/icons-material/Redeem";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.storeData.userData);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box className="student-dashboard-container">
      {/* Header Row: Welcome + Navigation */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h4" fontWeight={700} color="#1B6CA8">
          Welcome, {user?.name}!
        </Typography>

        <Box display="flex" gap={1} flexWrap="wrap">
          <Button
            className="nav-btn"
            startIcon={<MenuBookIcon />}
            onClick={() => handleNavigation("assignments")}
          >
            Assignments
          </Button>
          <Button
            className="nav-btn"
            startIcon={<CalculateIcon />}
            onClick={() => handleNavigation("math")}
          >
            Math
          </Button>
          <Button
            className="nav-btn"
            startIcon={<EmojiEventsIcon />}
            onClick={() => handleNavigation("rewards")}
          >
            Rewards
          </Button>
          <Button className="nav-btn" startIcon={<SettingsIcon />}>
            Settings
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {/* Reading Level and Streak */}
        <Grid item xs={12} md={6}>
          <Paper className="student-dashboard-card">
            <Typography variant="subtitle1" fontWeight={600}>
              Reading Level
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Avatar sx={{ bgcolor: "#4caf50", width: 56, height: 56 }}>
                G
              </Avatar>
              <Box ml={2} width="100%">
                <Typography fontSize={14} color="text.secondary">
                  XP Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={65}
                  sx={{ height: 10, borderRadius: 5, backgroundColor: "#eee" }}
                />
                <Typography fontSize={12} color="text.secondary" mt={0.5}>
                  650 / 1000 XP to next level
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            className="student-dashboard-card"
            sx={{ backgroundColor: "#fff8e1" }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              🔥 Daily Streak
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <LocalFireDepartmentIcon
                sx={{ color: "#f44336", fontSize: 40 }}
              />
              <Typography variant="h6" fontWeight={700} ml={1}>
                5 days in a row!
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Assignments */}
        <Grid item xs={12} md={6}>
          <Paper className="student-dashboard-card">
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              📚 Reading Assignments
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Read ‘The Curious Owl’ - Chapter 2" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Answer quiz: Vocabulary Practice A" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="student-dashboard-card">
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              ➕ Math Assignments
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Solve: Addition Level 3 Worksheet" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Timed test: 10 mins subtraction" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Rewards */}
        <Grid item xs={12}>
          <Paper className="student-dashboard-card">
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              🏅 Recent Rewards
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <Box className="reward-badge">
                <EmojiEventsIcon sx={{ color: "#fbc02d" }} />
                <Typography fontSize={12}>Gold Star</Typography>
              </Box>
              <Box className="reward-badge">
                <RedeemIcon sx={{ color: "#4caf50" }} />
                <Typography fontSize={12}>Bookworm Badge</Typography>
              </Box>
              <Box className="reward-badge">
                <EmojiEventsIcon sx={{ color: "#90caf9" }} />
                <Typography fontSize={12}>Math Whiz</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Reading Tips & Leaderboard */}
        <Grid item xs={12} md={6}>
          <Paper className="student-dashboard-card">
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              ✍️ Reading Tips
            </Typography>
            <Typography fontSize={14} color="text.secondary" mb={1}>
              📖 Try reading aloud to improve fluency.
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              💡 Highlight unfamiliar words and ask someone their meaning.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="student-dashboard-card">
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              🏆 Top Students This Week
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>🥇</ListItemIcon>
                <ListItemText primary="Ava M. — 3200 XP" />
              </ListItem>
              <ListItem>
                <ListItemIcon>🥈</ListItemIcon>
                <ListItemText primary="Ethan J. — 2900 XP" />
              </ListItem>
              <ListItem>
                <ListItemIcon>🥉</ListItemIcon>
                <ListItemText primary="Liam P. — 2750 XP" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Announcement */}
        <Grid item xs={12}>
          <Paper
            className="student-dashboard-card"
            sx={{ backgroundColor: "#fffde7" }}
          >
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              📢 Announcement
            </Typography>
            <Typography fontSize={14}>
              🗓️ Don’t forget: Reading Week starts on Monday! Complete 3
              assignments by Friday to win extra rewards!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
