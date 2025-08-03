import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import { useDispatch, useSelector } from "react-redux";
import LoaderModal from "../../../Loader/LoaderModal";
import { fetchChildDetails } from "../../../store/action/users.action";

const LibraryAndAssignments = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.storeData.userData);
  const { children, loading, hasFetchedChildren } = useSelector(
    (state) => state.storeData.userData
  );

  useEffect(() => {
    if (!hasFetchedChildren && user?.userId) {
      dispatch(fetchChildDetails(user.userId));
    }
  }, [dispatch, user?.userId, hasFetchedChildren]);

  const totalChildren = children?.length || 0;
  const totalAssignments = children?.reduce(
    (sum, child) => sum + (child.readingProgress?.length || 0),
    0
  );
  const completedAssignments = children?.reduce(
    (sum, child) =>
      sum + child.readingProgress.filter((p) => p.isCompleted === true).length,
    0
  );
  const avgProgress =
    totalAssignments > 0
      ? Math.round(
          children?.reduce(
            (sum, child) =>
              sum +
              child.readingProgress.reduce(
                (s, p) => s + (p.progressPercent || 0),
                0
              ),
            0
          ) / totalAssignments
        )
      : 0;

  return (
    <Box sx={{ p: 4, backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Monitor your child’s assignments and reading progress.
      </Typography>

      {/* ✅ Summary Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{ p: 3, textAlign: "center", borderRadius: 3, boxShadow: 2 }}
          >
            <GroupIcon color="primary" fontSize="large" />
            <Typography variant="h6">{totalChildren}</Typography>
            <Typography variant="body2" color="textSecondary">
              Total Children
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{ p: 3, textAlign: "center", borderRadius: 3, boxShadow: 2 }}
          >
            <AssignmentIcon color="secondary" fontSize="large" />
            <Typography variant="h6">{totalAssignments}</Typography>
            <Typography variant="body2" color="textSecondary">
              Total Assignments
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{ p: 3, textAlign: "center", borderRadius: 3, boxShadow: 2 }}
          >
            <CheckCircleIcon sx={{ color: "#4CAF50" }} fontSize="large" />
            <Typography variant="h6">{completedAssignments}</Typography>
            <Typography variant="body2" color="textSecondary">
              Completed
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{ p: 3, textAlign: "center", borderRadius: 3, boxShadow: 2 }}
          >
            <LinearProgress
              variant="determinate"
              value={avgProgress}
              sx={{ height: 8, borderRadius: 4, mb: 1 }}
            />
            <Typography variant="h6">{avgProgress}%</Typography>
            <Typography variant="body2" color="textSecondary">
              Average Progress
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* ✅ Child Assignments */}
      {loading ? (
        <LoaderModal open={loading} messages={["Fetching Child Data..."]} />
      ) : totalChildren === 0 ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No children found.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            You haven't added any children yet. Please add a child to monitor
            their progress.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {children?.map((child) => (
            <Grid item xs={12} md={6} lg={4} key={child.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ width: 56, height: 56, bgcolor: "#42A5F5" }}>
                    {child.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6">{child.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Grade: {child.grade} | Level: {child.level}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  Assignments Progress
                </Typography>

                {child.readingProgress.length === 0 ? (
                  <Typography>No assignments assigned yet.</Typography>
                ) : (
                  child.readingProgress.map((progress) => (
                    <Accordion
                      key={progress.progressId}
                      sx={{ borderRadius: 2, mb: 1 }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ width: "100%" }}>
                          <Typography variant="subtitle1" fontWeight="500">
                            {progress.assignment?.book?.title}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <LinearProgress
                              variant="determinate"
                              value={progress?.progressPercent}
                              sx={{
                                flex: 1,
                                height: 8,
                                borderRadius: 4,
                                mr: 1,
                              }}
                            />
                            <Typography variant="caption" sx={{ minWidth: 35 }}>
                              {progress.progressPercent}%
                            </Typography>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                        >
                          {progress.assignment?.book?.description}
                        </Typography>
                        <Chip
                          icon={<SchoolIcon />}
                          label={`Due in ${progress?.assignment?.dueDate} days`}
                          size="small"
                          color={progress?.isCompleted ? "success" : "warning"}
                          sx={{ mt: 1 }}
                        />
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ mt: 1 }}
                        >
                          Last Accessed:{" "}
                          {new Date(progress?.lastAccessed).toLocaleString()}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default LibraryAndAssignments;
