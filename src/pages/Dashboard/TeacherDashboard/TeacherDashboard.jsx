import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssessmentIcon from "@mui/icons-material/Assessment";
import "./TeacherDashboard.css";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const students = [
    {
      name: "Ava M.",
      readingLevel: "G",
      readingXP: 620,
      mathAccuracy: "88%",
      quizAvg: "92%",
      streak: 6,
    },
    {
      name: "Liam P.",
      readingLevel: "H",
      readingXP: 480,
      mathAccuracy: "76%",
      quizAvg: "85%",
      streak: 4,
    },
    {
      name: "Ethan J.",
      readingLevel: "F",
      readingXP: 520,
      mathAccuracy: "91%",
      quizAvg: "88%",
      streak: 7,
    },
    {
      name: "Sophia W.",
      readingLevel: "I",
      readingXP: 700,
      mathAccuracy: "94%",
      quizAvg: "96%",
      streak: 10,
    },
    {
      name: "Ava M.",
      readingLevel: "G",
      readingXP: 620,
      mathAccuracy: "88%",
      quizAvg: "92%",
      streak: 6,
    },
    {
      name: "Liam P.",
      readingLevel: "H",
      readingXP: 480,
      mathAccuracy: "76%",
      quizAvg: "85%",
      streak: 4,
    },
    {
      name: "Ethan J.",
      readingLevel: "F",
      readingXP: 520,
      mathAccuracy: "91%",
      quizAvg: "88%",
      streak: 7,
    },
    {
      name: "Sophia W.",
      readingLevel: "I",
      readingXP: 700,
      mathAccuracy: "94%",
      quizAvg: "96%",
      streak: 10,
    },
  ];

  const handleAddStudent = () => {
    navigate("/student-profile");
  };
  return (
    <Box className="teacher-dashboard-container">
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight={700} color="#1B6CA8">
          👩‍🏫 Teacher Dashboard
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Download Reports
          </Button>
          <Button
            variant="text"
            onClick={handleAddStudent}
            sx={{ textTransform: "none", fontWeight: 500, color: "#1B6CA8" }}
          >
            ➕ Add Student
          </Button>
        </Box>
      </Box>

      {/* Student Table */}
      <Paper className="teacher-dashboard-card">
        <Typography variant="h6" fontWeight={600} mb={2}>
          📋 Class Roster
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Reading Level</TableCell>
              <TableCell>XP</TableCell>
              <TableCell>Math Accuracy</TableCell>
              <TableCell>Quiz Avg</TableCell>
              <TableCell>Streak</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s, index) => (
              <TableRow key={index}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.readingLevel}</TableCell>
                <TableCell>{s.readingXP} XP</TableCell>
                <TableCell>{s.mathAccuracy}</TableCell>
                <TableCell>{s.quizAvg}</TableCell>
                <TableCell>{s.streak} days</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Interventions & Trends */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Paper className="teacher-dashboard-card">
            <Typography variant="h6" fontWeight={600} mb={1}>
              📊 Engagement Trends
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              • 80% of students are consistently completing assignments.
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              • Reading XP jumped 15% last week.
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              • Average quiz score rose from 85% to 89%.
            </Typography>
            <Button
              variant="text"
              size="small"
              startIcon={<TrendingUpIcon />}
              sx={{ mt: 2, textTransform: "none" }}
            >
              View Full Analytics
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="teacher-dashboard-card">
            <Typography variant="h6" fontWeight={600} mb={1}>
              🎯 Suggested Interventions
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              • Ethan may need practice in comprehension.
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              • Liam's math accuracy dipped 10% this week.
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              • Ava could move to Level H soon.
            </Typography>
            <Button
              variant="text"
              size="small"
              startIcon={<AssessmentIcon />}
              sx={{ mt: 2, textTransform: "none" }}
            >
              Review Recommendations
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
