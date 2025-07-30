import { createSlice } from "@reduxjs/toolkit";
import { fetchAssignmentsByGrade } from "../action/students.action";

const studentData = createSlice({
  name: "studentsStore",
  initialState: {
    assignments: [],
    loading: false,
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    updateReadingProgress: (state, action) => {
      const { assignmentId, pagesCompleted, totalPages, isCompleted } =
        action.payload;
        console.log("Updating reading progress for assignment:", assignmentId, pagesCompleted, totalPages, isCompleted);
        
      const assignment = state.assignments.find(
        (assignment) => assignment.assignmentId  === assignmentId
      );
      if (assignment) {
        assignment.readingProgress = {
          ...assignment.readingProgress, // keep any existing properties
          pagesCompleted,
          totalPages,
          isCompleted,
          progressPercent: totalPages
            ? (pagesCompleted / totalPages) * 100
            : 0,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssignmentsByGrade.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAssignmentsByGrade.fulfilled, (state, action) => {
      state.assignments = action.payload.assignments;
      state.loading = false;
    });
    builder.addCase(fetchAssignmentsByGrade.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { setIsAuthenticated, updateReadingProgress } =
  studentData.actions;

export default studentData.reducer;
