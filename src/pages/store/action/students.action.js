import { createAsyncThunk } from "@reduxjs/toolkit";
import studentsService from "../../../services/students.service";

export const fetchAssignmentsByGrade = createAsyncThunk(
  "studentsStore/fetchAssignmentsByGrade",
  async (data) => {
    const response = await studentsService.fetchAssignmentsByGrade(data);
    console.log("Response from fetchAssignmentsByGrade:", response);
    return response;
  }
);

export const fetchPdfContent = createAsyncThunk(
  "studentsStore/fetchPdfContent",
  async (path) => {
    console.log(path);

    const response = await studentsService.fetchPdfContent(path);
    console.log("Response from fetchPdfContent:", response);
    return response;
  }
);

export const transformContent = createAsyncThunk(
  "studentsStore/transformContent",
  async (data) => {
    console.log(data);
    const response = await studentsService.transformContent(data);
    console.log("Response from transformContent:", response);
    return response;
  }
);

export const updatePageReadStatus = createAsyncThunk(
  "studentsStore/updatePageReadStatus",
  async (data) => {
    console.log(data);
    const response = await studentsService.updatePageReadStatus(data);
    console.log("Response from updatePageReadStatus:", response);
    return response;
  }
);
