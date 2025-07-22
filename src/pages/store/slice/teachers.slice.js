import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentsByGrades } from "../action/teachers.action";

const teacherData = createSlice({
  name: "teachersStore",
  initialState: {
    students: [],
    loading: false,
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudentsByGrades.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStudentsByGrades.fulfilled, (state, action) => {
      state.students = action.payload.students;
      state.loading = false;
    });
    builder.addCase(fetchStudentsByGrades.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { setIsAuthenticated } = teacherData.actions;

export default teacherData.reducer;
