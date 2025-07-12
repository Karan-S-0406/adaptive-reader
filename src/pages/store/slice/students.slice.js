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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssignmentsByGrade.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAssignmentsByGrade.fulfilled, (state, action) => {
      state.students = action.payload.students;
      state.loading = false;
    });
    builder.addCase(fetchAssignmentsByGrade.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { setIsAuthenticated } = studentData.actions;

export default studentData.reducer;