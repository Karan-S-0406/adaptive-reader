import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Chip,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignmentsByGrade } from "../../../../store/action/students.action";
import SideBySideReader from "../../../../Assignments/SideBySideReader";
import { useLocation } from "react-router-dom";
import "./Assignments.css"; // Assuming you have some styles for this component

export default function Assignments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [statusFilter, setStatusFilter] = useState("all");
  const selectedType = location.state?.type || "reading"; // fallback to reading

  const user = useSelector((state) => state.storeData.userData);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const assignmentsFromStore = useSelector(
    (state) => state.storeData.studentsData.assignments
  );

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    // ✅ If assignments already exist in store, use them and skip API call
    if (assignmentsFromStore && assignmentsFromStore.length > 0) {
      const filtered = assignmentsFromStore.filter(
        (a) => a.type === selectedType
      );
      setAssignments(filtered);
      setLoading(false);
      return;
    }

    const fetchAssignments = async () => {
      if (!user?.grade) return;
      console.log(assignmentsFromStore, "store");

      try {
        const reqBody = {
          studentId: user?.userId,
          grade: user?.grade,
        };
        const res = await dispatch(fetchAssignmentsByGrade(reqBody));
        const data = res.payload;
        if (data.success) {
          setAssignments(
            (data.assignments || []).filter((a) => a.type === selectedType)
          );
        }
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [assignmentsFromStore, dispatch, selectedType, user?.grade, user?.userId]);

  const handleBack = () => {
    setSelectedAssignment(null);
  };

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const extractStoragePath = (pdfUrl) => {
    const prefix = import.meta.env.VITE_STORAGE_BUCKET_URL; // ✅ Get from .env
    console.log(`Extracting path from: ${pdfUrl} with prefix: ${prefix}`);
    return pdfUrl.startsWith(prefix) ? pdfUrl.slice(prefix.length) : pdfUrl;
  };

  const filteredAssignments = assignments.filter((a) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "new") return a.readingProgress === null;
    if (statusFilter === "in-progress")
      return a.readingProgress && a.readingProgress.isCompleted === false;
    if (statusFilter === "completed")
      return a.readingProgress && a.readingProgress.isCompleted === true;
    return true;
  });

  return (
    <Box className="reading-container">
      <Paper className="reading-card">
        {/* Header */}
        <Box className="reading-header">
          <Typography variant="h5" className="section-title">
            {selectedType === "math"
              ? "🧮 Math Assignments"
              : "📚 Reading Assignments"}
          </Typography>

          <Box className="assignment-controls">
            <Typography className="status-label">Status:</Typography>

            <select
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="in-progress">In-Progress</option>
              <option value="completed">Completed</option>
            </select>

            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() =>
                selectedAssignment
                  ? handleBack()
                  : navigate("/dashboard/student")
              }
              className="back-button"
            >
              Back to {selectedAssignment ? "Assignments" : "Dashboard"}
            </Button>
          </Box>
        </Box>

        {/* Assignment View */}
        {selectedAssignment ? (
          <SideBySideReader
            selectedAssignment={selectedAssignment}
            title={selectedAssignment.title}
            storagePath={
              selectedAssignment.type === "math"
                ? extractStoragePath(selectedAssignment.pdfUrl)
                : undefined
            }
            onBack={handleBack}
          />
        ) : loading ? (
          <Box className="loading-container">
            <CircularProgress color="primary" />
            <Typography className="loading-text">
              Loading assignments...
            </Typography>
          </Box>
        ) : assignments.length === 0 ? (
          <Box className="no-data-container">
            <Typography variant="h6" color="text.secondary">
              No assignments available.
            </Typography>
          </Box>
        ) : (
          <Box className="assignments-wrapper">
            {filteredAssignments.length === 0 ? (
              <Box textAlign="center" py={6}>
                <Typography variant="h6" color="text.secondary">
                  {`No assignments found for the selected status: ${capitalize(
                    statusFilter
                  )}.`}
                </Typography>
              </Box>
            ) : (
              <Box className="assignments-wrapper">
                {filteredAssignments.map((a, i) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={i}
                    className="assignment-grid"
                  >
                    <Paper
                      className="assignment-card"
                      elevation={3}
                      onClick={() => handleAssignmentClick(a)}
                    >
                      <Box className="assignment-title-wrapper">
                        <AssignmentIcon className="assignment-icon" />
                        <Tooltip title={a.title} arrow>
                          <Typography variant="h6" className="assignment-title">
                            {a.title}
                          </Typography>
                        </Tooltip>
                      </Box>

                      <Typography variant="body2" className="due-date">
                        <CalendarTodayIcon className="calendar-icon" />
                        Due in {a.dueDate} days
                      </Typography>

                      <Chip
                        label={`Grade ${a.grade}`}
                        color="primary"
                        size="small"
                        className="grade-chip"
                      />

                      <Typography
                        variant="body2"
                        className="assignment-description"
                      >
                        {a.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}
