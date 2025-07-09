import { createAsyncThunk } from "@reduxjs/toolkit";
import teachersService from "../../../services/teachers.service";

export const fetchStudentsByGrades = createAsyncThunk(
  "usersStore/fetchStudentsByGrades",
  async (data) => {
    const response = await teachersService.fetchStudentsByGrades(data);
    console.log("Response from fetchStudentsByGrades:", response);
    return response;
  }
);
