import axios from "axios";
import Constants from "../constants/constants";

class UsersServiceService {
  constructor() {
    this.reqUrl = Constants.API_BASEURL;
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
      console.log("Fetching user ID and role for email:", this.reqUrl);
      const response = await axios.post(
        "${this.reqUrl}students/addStudent",
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default new UsersServiceService();
