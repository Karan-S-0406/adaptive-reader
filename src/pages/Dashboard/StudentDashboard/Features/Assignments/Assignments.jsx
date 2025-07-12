import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PdfReader from "./PdfReader/PdfReader";
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
        console.log("Assignments fetched:", data);
        if (data.success) {
          setAssignments(data.assignments || []);
        } else {
          console.error("Error fetching:", data.message);
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
    <Box className="reading-container">
      <Paper className="reading-card">
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexWrap="wrap"
          gap={1}
        >
          <Typography variant="h5" className="section-title">
            📚 Reading Assignment
          </Typography>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() =>
              selectedAssignment ? handleBack() : navigate("/dashboard/student")
            }
            sx={{ textTransform: "none", fontWeight: 500, color: "#1B6CA8" }}
          >
            Back to {selectedAssignment ? "Assignments" : "Dashboard"}
          </Button>
        </Box>

        {/* Assignment Viewer */}
        {selectedAssignment ? (
          <PdfReader
            title={selectedAssignment.title}
            storagePath={extractStoragePath(selectedAssignment.pdfUrl)}
            onBack={handleBack}
          />
        ) : loading ? (
          <Box textAlign="center" my={4}>
            <CircularProgress />
            <Typography mt={2}>Loading assignments...</Typography>
          </Box>
        ) : assignments.length === 0 ? (
          <Typography>No assignments available.</Typography>
        ) : (
          <Grid container spacing={2}>
            {assignments.map((a, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Paper
                  elevation={2}
                  sx={{ p: 2, cursor: "pointer" }}
                  onClick={() => handleAssignmentClick(a)}
                >
                  <Typography variant="h6">{a.title}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Grade: {a.grade} | Due in {a.dueDate} days
                  </Typography>
                  <Typography variant="body2">{a.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
