import { createAsyncThunk } from "@reduxjs/toolkit";
import usersServices from "../../../services/users.services";

export const getUserIdAndRole = createAsyncThunk(
	"usersStore/getUserIdAndRole",
	async (email) => {
		const response = await usersServices.getUserIdAndRole(email);		
		return response;
	}
);

export const addStudent = createAsyncThunk(
	"usersStore/addStudent",
	async (data) => {
		const response = await usersServices.addStudent(data);
		console.log("Response from addStudent:", response);
		return response;
	}
);

export const addParent = createAsyncThunk(
	"usersStore/addParent",
	async (data) => {
		const response = await usersServices.addParent(data);
		console.log("Response from addParent:", response);
		return response;
	}
);

export const getOTP = createAsyncThunk(
	"usersStore/getOTP",
	async (data) => {
		const response = await usersServices.getOTP(data);
		console.log("Response from getOTP:", response);
		return response;
	}
);

export const verifyPasswordAndGetUserDetails = createAsyncThunk(
	"usersStore/verifyPasswordAndGetUserDetails",
	async (data) => {
		const response = await usersServices.verifyPasswordAndGetUserDetails(data);		
		return response;
	}
);

export const fetchChildDetails = createAsyncThunk(
	"usersStore/fetchChildDetails",
	async (data) => {
		const response = await usersServices.fetchChildDetails(data);		
		return response;
	}
);