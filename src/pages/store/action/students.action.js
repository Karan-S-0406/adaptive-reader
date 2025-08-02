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

export const adaptForUSStudents = createAsyncThunk(
  "studentsStore/adaptForUSStudents",
  async (data) => {
    console.log(data);
    const response = await studentsService.adaptForUSStudents(data);
    console.log("Response from adaptForUSStudents:", response);
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

export const fetchBookContent = createAsyncThunk(
  "studentsStore/fetchBookContent",
  async (iaIdentifier) => {
    console.log(iaIdentifier);

    const response = await studentsService.fetchBookContent(iaIdentifier);
    console.log("Response from fetchBookContent:", response);
    return response;
  }
);

export const generateMathMCQ = createAsyncThunk(
  "studentsStore/generateMathMCQ",
  async ({ grade, storagePath }) => {
    const response = await studentsService.generateMathMCQ({
      grade,
      storagePath,
    });
    console.log("Response from generateMathMCQ:", response);
    return response;
  }
);

export const getMCQExplanation = createAsyncThunk(
  "studentsStore/getMCQExplanation",
  async (reqBody) => {
    const response = await studentsService.getMCQExplanation(reqBody);
    console.log("Response from getMCQExplanation:", response);
    return response;
  }
);

export const fetchSignedImageUrl = createAsyncThunk(
  "studentsStore/fetchSignedImageUrl",
  async ({storagePath}) => {
    const response = await studentsService.fetchSignedImageUrl({storagePath});
    console.log("Response from fetchSignedImageUrl:", response);
    return response;
  }
);
