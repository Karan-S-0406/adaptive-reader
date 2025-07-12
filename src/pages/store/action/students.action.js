import { createAsyncThunk } from "@reduxjs/toolkit";
import studentsService from "../../../services/students.service";

export const fetchAssignmentsByGrade = createAsyncThunk(
  "usersStore/fetchAssignmentsByGrade",
  async (data) => {
    const response = await studentsService.fetchAssignmentsByGrade(data);
    console.log("Response from fetchAssignmentsByGrade:", response);
    return response;
  }
);
