import axios from "axios";
import Constants from "../constants/constants";

class StudentsService {
  constructor() {
    this.reqUrl = Constants.API_BASEURL;
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