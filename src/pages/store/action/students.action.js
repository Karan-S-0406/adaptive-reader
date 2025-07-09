import { createAsyncThunk } from "@reduxjs/toolkit";
import studentsService from "../../../services/students.service";

export const fetchStudentsByGrades = createAsyncThunk(
  "usersStore/fetchStudentsByGrades",
  async (data) => {
    const response = await studentsService.fetchStudentsByGrades(data);
    console.log("Response from fetchStudentsByGrades:", response);
    return response;
  }
);
