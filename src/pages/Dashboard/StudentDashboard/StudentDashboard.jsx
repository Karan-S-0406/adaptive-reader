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
  Divider,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalculateIcon from "@mui/icons-material/Calculate";
import SettingsIcon from "@mui/icons-material/Settings";
import RedeemIcon from "@mui/icons-material/Redeem";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.storeData.userData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleSettingsClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box className="student-dashboard-container">
      {/* Header */}
      <Box className="dashboard-header">
        <Typography variant="h4" fontWeight={700} color="#1B6CA8">
          Welcome, {user?.name || "Student"}!
        </Typography>
        <Box className="dashboard-buttons">
          <Button
            className="nav-btn reading-btn"
            startIcon={<MenuBookIcon />}
            onClick={() =>
              navigate("assignments", { state: { type: "reading" } })
            }
          >
            Reading
          </Button>
          <Button
            className="nav-btn math-btn"
            startIcon={<CalculateIcon />}
            onClick={() =>
              navigate("assignments", { state: { type: "math" } })
            }
          >
            Math
          </Button>
          <Tooltip title="Settings">
            <IconButton onClick={handleSettingsClick} className="settings-icon">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => alert("Change password clicked!")}>
              Change Password
            </MenuItem>
            <MenuItem onClick={() => alert("Log out clicked!")}>
              Log Out
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {/* XP Card */}
        <Grid item xs={12} md={6}>
          <Paper className="student-dashboard-card fade-in">
            <Typography variant="subtitle1" fontWeight={600}>
              📘 Reading Level
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Avatar sx={{ bgcolor: "#4caf50", width: 56, height: 56 }}>
                G
              </Avatar>
              <Box ml={2} width="100%">
                <Typography fontSize={14}>XP Progress</Typography>
                <LinearProgress
                  variant="determinate"
                  value={65}
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography fontSize={12} mt={0.5}>
                  650 / 1000 XP to next level
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Daily Streak */}
        <Grid item xs={12} md={6}>
          <Paper className="student-dashboard-card streak-card fade-in">
            <Typography variant="subtitle1" fontWeight={600}>
              🔥 Daily Streak
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <LocalFireDepartmentIcon sx={{ fontSize: 40 }} />
              <Typography variant="h6" fontWeight={700} ml={1}>
                5 days in a row!
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Reading Assignments */}
        <Grid item xs={12} md={6}>
          <Paper className="student-dashboard-card zoom-in">
            <Typography variant="subtitle1" fontWeight={600}>
              📚 Reading Assignments
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Read: 'The Curious Owl' - Chapter 2" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Vocabulary Quiz: Practice A" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Rewards */}
        <Grid item xs={12}>
          <Paper className="student-dashboard-card fade-in">
            <Typography variant="subtitle1" fontWeight={600}>
              🏅 Recent Rewards
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
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

        {/* Reading Tips */}
        <Grid item xs={12} md={6}>
          <Paper className="student-dashboard-card slide-in-left">
            <Typography variant="subtitle1" fontWeight={600}>
              ✍️ Reading Tips
            </Typography>
            <Typography fontSize={14} mt={1}>
              📖 Read aloud to boost fluency.
            </Typography>
            <Typography fontSize={14}>
              💡 Ask about difficult words as you read.
            </Typography>
          </Paper>
        </Grid>

        {/* Leaderboard */}
        <Grid item xs={12} md={6}>
          <Paper className="student-dashboard-card slide-in-right">
            <Typography variant="subtitle1" fontWeight={600}>
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
          <Paper className="student-dashboard-card announcement-card fade-in">
            <Typography variant="subtitle1" fontWeight={600}>
              📢 Announcement
            </Typography>
            <Typography fontSize={14}>
              🗓️ Reading Week starts Monday! Complete 3 assignments by Friday to
              earn rewards!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
