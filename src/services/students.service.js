import axios from "axios";

class StudentsService {
  constructor() {
    this.reqUrl = import.meta.env.VITE_API_BASE_URL;
  }

  async fetchAssignmentsByGrade(data) {
    try {
      const reqBody = {
        grade: data,
      };
      const response = await axios.post(
        `${this.reqUrl}students/fetchAssignmentsByGrade`,
        reqBody
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default new StudentsService();