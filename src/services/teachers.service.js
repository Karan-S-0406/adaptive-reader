import axios from "axios";
import Constants from "../constants/constants";

class TeachersService {
  constructor() {
    this.reqUrl = Constants.API_BASEURL;
  }

  async fetchStudentsByGrades(data) {
    try {
      const reqBody = {
        grades: data,
      };
      console.log("Fetching user ID and role for email:", this.reqUrl);
      const response = await axios.post(
        `${this.reqUrl}students/by-grades`,
        reqBody
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default new TeachersService();
