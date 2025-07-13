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

  async addStudent(data) {
    try {
      const response = await axios.post(
        `${this.reqUrl}students/addStudent`,
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default new UsersService();
