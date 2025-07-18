import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideBySideReader from "../../../../SideBySideReader";
import { fetchAssignmentsByGrade } from "../../../../store/action/students.action";

export default function Assignments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.storeData.userData);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!user?.grade) return;

      try {
        const res = await dispatch(fetchAssignmentsByGrade(user.grade));
        const data = res.payload;
        if (data.success) {
          setAssignments(data.assignments || []);
        }
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [user?.grade]);

  const handleBack = () => {
    setSelectedAssignment(null);
  };

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const extractStoragePath = (pdfUrl) => {
    const prefix = "https://storage.googleapis.com/smartzy-assignments/";
    return pdfUrl.startsWith(prefix) ? pdfUrl.slice(prefix.length) : pdfUrl;
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f9fafc", minHeight: "100vh" }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#1B6CA8" }}
          >
            📚 Reading Assignments
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() =>
              selectedAssignment ? handleBack() : navigate("/dashboard/student")
            }
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: 500,
            }}
          >
            Back to {selectedAssignment ? "Assignments" : "Dashboard"}
          </Button>
        </Box>

        {/* Assignment View */}
        {selectedAssignment ? (
          <SideBySideReader
            selectedAssignment={selectedAssignment}
            title={selectedAssignment.title}
            storagePath={extractStoragePath(selectedAssignment.pdfUrl)}
            onBack={handleBack}
          />
        ) : loading ? (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress color="primary" />
            <Typography sx={{ mt: 2, color: "#666" }}>
              Loading assignments...
            </Typography>
          </Box>
        ) : assignments.length === 0 ? (
          <Box textAlign="center" py={6}>
            <Typography variant="h6" color="text.secondary">
              No assignments available.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {assignments.map((a, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #ffffff 60%, #f0f8ff 100%)",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    },
                  }}
                  onClick={() => handleAssignmentClick(a)}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <AssignmentIcon sx={{ color: "#1B6CA8", mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {a.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    <CalendarTodayIcon
                      sx={{ fontSize: "16px", color: "#888", mr: 0.5 }}
                    />
                    Due in {a.dueDate} days
                  </Typography>
                  <Chip
                    label={`Grade ${a.grade}`}
                    color="primary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#444",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      WebkitLineClamp: 3,
                    }}
                  >
                    {a.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
