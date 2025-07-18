import { createSlice } from "@reduxjs/toolkit";
import {
  addParent,
  addStudent,
  fetchChildDetails,
  getUserIdAndRole,
  verifyPasswordAndGetUserDetails,
} from "../action/users.action";
import Swal from "sweetalert2";

const userData = createSlice({
  name: "usersStore",
  initialState: {
    userId: "",
    email: "",
    role: "",
    name: "",
    grade: "",
    level: "",
    isAuthenticated: false,
    children: [],
    loading: false,
    addStudentLoading: false,
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
      state.level = action.payload.level || "";
      state.children = action.payload.children || [];
      state.loading = false;
    });
    builder.addCase(getUserIdAndRole.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addStudent.pending, (state) => {
      state.addStudentLoading = true;
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.addStudentLoading = false;

      const payload = action.payload;

      if (payload.success) {
        // ✅ Student added successfully
        Swal.fire(
          "Success!",
          "Child added and linked successfully.",
          "success"
        );
      } else {
        // ✅ If student already exists or some validation failed
        if (payload.message && payload.message.includes("already exists")) {
          Swal.fire("Warning!", payload.message, "warning");
        } else {
          Swal.fire(
            "Error!",
            payload.message || "Something went wrong.",
            "error"
          );
        }
      }
    });
    builder.addCase(addStudent.rejected, (state) => {
      state.addStudentLoading = false;
    });
    builder.addCase(addParent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addParent.fulfilled, (state, action) => {
      console.log(action.payload, "addParent slice");
      state.userId = action.payload.id;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.children = action.payload.children || [];
      state.loading = false;
    });
    builder.addCase(addParent.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(verifyPasswordAndGetUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      verifyPasswordAndGetUserDetails.fulfilled,
      (state, action) => {
        console.log(action.payload, "verifyPasswordAndGetUserDetails slice");
        state.userId = action.payload.id;
        state.role = action.payload.role;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.children = action.payload.children || [];
        state.grade = action.payload.grade || "";
        state.level = action.payload.level || "";
        state.loading = false;
      }
    );
    builder.addCase(verifyPasswordAndGetUserDetails.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchChildDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchChildDetails.fulfilled, (state, action) => {
      console.log(action.payload, "fetchChildDetails slice");
      state.children = action.payload.children || [];
      state.loading = false;
    });
    builder.addCase(fetchChildDetails.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { setIsAuthenticated } = userData.actions;

export default userData.reducer;
