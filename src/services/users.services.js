import axios from "axios";

class UsersService {
  constructor() {
    this.reqUrl = import.meta.env.VITE_API_BASE_URL;
  }

  async getUserIdAndRole(email) {
    try {
      const response = await axios.get(
        `${this.reqUrl}users/getUserIdAndRole/${email}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async addParent(data) {
    try {
      const response = await axios.post(`${this.reqUrl}users/addParent`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async addStudent(data) {
    try {
      const response = await axios.post(`${this.reqUrl}users/addStudent`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getOTP(data) {
    try {
      const response = await axios.post(`${this.reqUrl}users/getOTP`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async verifyPasswordAndGetUserDetails(data) {
    try {
      const response = await axios.post(
        `${this.reqUrl}users/verifyPasswordAndGetUserDetails`,
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async fetchChildDetails(data) {
    try {
      const response = await axios.get(
        `${this.reqUrl}users/fetchChildDetails/${data}`,
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default new UsersService();
