import { createSlice } from "@reduxjs/toolkit";
import { getUserIdAndRole } from "../action/users.action";

const userData = createSlice({
  name: "usersStore",
  initialState: {
    userId: "",
    email: "",
    role: "",
    name: "",
    grade: "",
    band: "",
    isAuthenticated: false,
    gradesManaged: [],
    loading: false,
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserIdAndRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserIdAndRole.fulfilled, (state, action) => {
      state.userId = action.payload.id;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.grade = action.payload.grade || ""; 
      state.band = action.payload.band || "";
      state.gradesManaged = action.payload.grades_managed || [];
      state.loading = false;
    });
    builder.addCase(getUserIdAndRole.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { setIsAuthenticated } = userData.actions;

export default userData.reducer;
