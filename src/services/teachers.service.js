import axios from "axios";

class TeachersService {
  constructor() {
    this.reqUrl = import.meta.env.VITE_API_BASE_URL;
  }

  async fetchStudentsByGrades(data) {
    try {
      const reqBody = {
        grades: data,
      };
      const response = await axios.post(
        `${this.reqUrl}students/by-grades`,
        reqBody
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async uploadAssignment(data) {
    try {
      const response = await axios.post(
        `${this.reqUrl}teachers/uploadAssignment`,
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default new TeachersService();
