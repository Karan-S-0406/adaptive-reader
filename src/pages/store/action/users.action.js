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
		console.log("Response from getUserIdAndRole:", response);
		return response;
	}
);