import { createAsyncThunk } from "@reduxjs/toolkit";
import studentsService from "../../../services/students.service";

export const fetchAssignmentsByGrade = createAsyncThunk(
  "studentsStore/fetchAssignmentsByGrade",
  async (reqBody) => {
    const response = await studentsService.fetchAssignmentsByGrade(reqBody);
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


export const getMathExplanation = createAsyncThunk(
  "studentsStore/updatePageReadStatus",
  async (data) => {
    console.log(data);
    const response = await studentsService.getMathExplanation(data);
    console.log("Response from getMathExplanation:", response);
    return response;
  }
);

export const getSignedImageUrl = createAsyncThunk(
  "studentsStore/getSignedImageUrl",
  async (data) => {
    console.log(data);
    const response = await studentsService.getSignedImageUrl(data);
    console.log("Response from getSignedImageUrl:", response);
    return response;
  }
);