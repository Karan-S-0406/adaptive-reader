import { createSlice } from "@reduxjs/toolkit";
import { getUserIdAndRole } from "../action/users.action";

const userData = createSlice({
  name: "usersStore",
  initialState: {
    userId: "",
    email: "",
    role: "",
    name: "",
    isAuthenticated: false,
    gradesManaged: [],
    loading: false,
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setNameAndRole: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      // state.userId = action.payload.user_id;
      state.gradesManaged = action.payload.grades_managed || [];
      state.email = action.payload.email || "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserIdAndRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserIdAndRole.fulfilled, (state, action) => {
      state.userId = action.payload.user_id;
      state.role = action.payload.role;
      state.loading = false;
    });
    builder.addCase(getUserIdAndRole.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { setNameAndRole, setIsAuthenticated } = userData.actions;

export default userData.reducer;
